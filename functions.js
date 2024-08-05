export function createHome() {

    let container = document.querySelector(".container");


    container.innerHTML = `
    
    	<h1>Doctors</h1>

    <button class="button"> Add doctor</button>

	<table class="table">
		<thead>
			<tr class="table-header">
				<th>Id</th>
				<th>Name</th>
				<th>Type</th>
				<th>No. Patients</th>
			</tr>
		</thead>
		<tbody>
		</tbody>
	</table>
    
    `

    api("https://localhost:7111/api/v1/Doctor/all").then(response => {
        return response.json();
    }).then(data => {
        console.log(data);

        attachDoctors(data.doctorList);
    }).catch(error => {
        console.error('Error fetching data:', error);
    });


    goToAddDoctorPage();



}

export function CreateAddDoctorPage() {

    let container = document.querySelector(".container");


    container.innerHTML = `
    
      <h1>New Doctor</h1>
    <form>
        <p>
            <label for="name">Name</label>
            <input name="name" type="text" id="name">
        </p>
        <p>
            <label for="typeDoc">Type</label>
            <input name="typeDoc" type="text" id="typeDoc">
        </p>
        <p>
            <label for="patients">Patients</label>
            <input name="patients" type="text" id="patients">
        </p>
        <div class="createDoctor">
         <a href="#">Create New Doctor</a>
        </div>
        <div class="cancel">
         <a href="#">Cancel</a>
        </div>
    </form>

    `
    let button = document.querySelector(".cancel");

    button.addEventListener("click", (eve) => {
        createHome();
    })

    let test = document.querySelector(".createDoctor");

    test.addEventListener("click", (eve) => {
        createDoctor();
    })

}

function createRow(doctor) {


    let tr = document.createElement("tr");

    tr.innerHTML = `
  
				<td>${doctor.id}</td>
				<td>${doctor.name}</td>
				<td>${doctor.type}</td>
				<td>${doctor.patients}</td>

    `

    return tr;
}

function api(path, method = "GET", body = null) {

    const url = path;
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'X-Requested-With': 'XMLHttpRequest',
        }
    }
    if (body != null) {
        options.body = JSON.stringify(body);
    }

    return fetch(url, options);
}

function attachDoctors(doctors) {

    let lista = document.querySelector("thead");

    doctors.forEach(doc => {

        let tr = createRow(doc);
        lista.appendChild(tr);

    });

    return lista;

}

function goToAddDoctorPage() {

    let button = document.querySelector(".button");

    button.addEventListener("click", (eve) => {
        CreateAddDoctorPage();
    })


}

function createDoctor() {

    let name = document.getElementById("name").value;
    let type = document.getElementById("typeDoc").value;
    let patients = document.getElementById("patients").value;

    if (name && type && patients) {

        let doctor = {
            name: name,
            patients: patients,
            type: type
        }

        api("https://localhost:7111/api/v1/Doctor/create", "POST", doctor)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        createHome();
    } else {
        alert('All fields must be completed!');
        return false;
    }

}