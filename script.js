document.getElementById('submitBtn').addEventListener('click', () => {
    const pincode = document.getElementById('pincode').value;
    const apiUrl = `https://api.postalpincode.in/pincode/${pincode}`;

    if (!pincode) {
        alert('Please enter a valid pincode!');
        return;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('tableBody');
            tableBody.innerHTML = '';

            if (data[0].Status === 'Success') {
                const postOffices = data[0].PostOffice;

                postOffices.forEach(office => {
                    const row = `
                        <tr>
                            <td>${office.Name}</td>
                            <td>${office.BranchType}</td>
                            <td>${office.DeliveryStatus}</td>
                            <td>${office.Circle}</td>
                            <td>${office.District}</td>
                            <td>${office.State}</td>
                            <td>${office.Country}</td>
                            <td>${office.Pincode}</td>
                        </tr>
                    `;
                    tableBody.innerHTML += row;
                });
            } else {
                alert(data[0].Message || 'No data found for this pincode.');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Failed to fetch data. Please try again later.');
        });
});
