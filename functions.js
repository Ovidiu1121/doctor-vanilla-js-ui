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


    let button = document.querySelector(".button");

    button.addEventListener("click", (eve) => {
        CreateAddDoctorPage();
    });

}

export function CreateAddDoctorPage() {

    let container = document.querySelector(".container");


    container.innerHTML = `
    
      <h1>New Doctor</h1>
    <form>
        <p class="name-container">
            <label for="name">Name</label>
            <input name="name" type="text" id="name">
            <a class="nameErr">Name required!</a>
        </p>
        <p class="type-container">
            <label for="typeDoc">Type</label>
            <input name="typeDoc" type="text" id="typeDoc">
            <a class="typeErr">Type required!</a>
        </p>
        <p class="patients-container">
            <label for="patients">Patients</label>
            <input name="patients" type="text" id="patients" placeholder="Ex:1,2,3...">
            <a class="patientsErr">Patients required!</a>
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
    let test = document.querySelector(".createDoctor");

    button.addEventListener("click", (eve) => {
        createHome();
    })

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

function createDoctor() {

    const isNumber = (str) => {
        return /^[+-]?\d+(\.\d+)?$/.test(str);
    };

    let name = document.getElementById("name").value;
    let type = document.getElementById("typeDoc").value;
    let patients = document.getElementById("patients").value;

    let nameError = document.querySelector(".nameErr");
    let typeError = document.querySelector(".typeErr");
    let patientsError = document.querySelector(".patientsErr");

    let errors = [];

    if (name == '') {

        errors.push("Name");

    } else if (nameError.classList.contains("beDisplayed") && name !== '') {

        errors.pop("Name");
        nameError.classList.remove("beDisplayed");
    }

    if (type == '') {

        errors.push("Type");

    } else if (typeError.classList.contains("beDisplayed") && type !== '') {

        errors.pop("Type");
        typeError.classList.remove("beDisplayed");
    }

    if (patients == '') {

        errors.push("Patients1");

    } else if (patientsError.classList.contains("beDisplayed") && patients !== '') {

        errors.pop("Patients1");
        patientsError.classList.remove("beDisplayed");

    }

    if (!isNumber(patients) && patients != '') {

        errors.push("Patients2");

    }
    else if (isNumber(patients)) {

        errors.pop("Patients2");

    } else if (patientsError.classList.contains("beDisplayed") && patients !== '') {

        errors.pop("Patients2");
        patientsError.classList.remove("beDisplayed");

    }

    if (errors.length == 0) {

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
                createHome();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    } else {

        errors.forEach(err => {

            if (err.includes("Name")) {

                nameError.classList.add("beDisplayed");
            }

            if (err.includes("Type")) {

                typeError.classList.add("beDisplayed");
            }

            if (err.includes("Patients1")) {

                patientsError.classList.add("beDisplayed");
            }

            if (err.includes("Patients2")) {

                patientsError.classList.add("beDisplayed")
                patientsError.textContent = "Only numbers";
            }

        })

    }

}


