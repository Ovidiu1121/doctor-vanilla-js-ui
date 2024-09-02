export function createHome(alert) {

    let container = document.querySelector(".container");

    container.innerHTML = `
    
       <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
       </div>  

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

    let button = document.querySelector(".button");
    let table = document.querySelector(".table");
    const alertPlaceholder = document.querySelector('.container-alert');
    let load = document.querySelector(".spinner-border");

    const appendAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
    }

    api("https://localhost:7111/api/v1/Doctor/all").then(response => {
        return response.json();
    }).then(data => {
        load.classList = "";
        //console.log(data);
        attachDoctors(data.doctorList);

    }).catch(error => {

        load.classList = "";

        console.error('Error fetching data:', error);

        appendAlert(error, "danger");
    });

    button.addEventListener("click", (eve) => {
        CreateAddDoctorPage();
    });

    table.addEventListener("click", (eve) => {

        if (eve.target.classList.contains("updateDoc")) {
            api(`https://localhost:7111/api/v1/Doctor/id/${eve.target.textContent}`).then(res => {
                return res.json();
            }).then(data => {
                console.log(data);

                let doctor = {
                    name: data.name,
                    patients: data.patients,
                    type: data.type
                }

                CreateUpdatePage(doctor, eve.target.textContent);

            }).catch(error => {
                console.error('Error fetching data:', error);
            });
        }

    });

    if (alert === "deleted") {
        load.classList = "";
        appendAlert("Book has been DELETED with success!", "success");
    }

    if (alert === "updated") {
        load.classList = "";
        appendAlert("Book has been UPDATED with success!", "success");
    }

    if (alert === "added") {
        load.classList = "";
        appendAlert("Book has been ADDED with success!", "success");
    }

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
        createHome("");
    })

    test.addEventListener("click", (eve) => {
        createUpdateDoctor("create");
    })

}

export function CreateUpdatePage(doctor, idDoctor) {

    let container = document.querySelector(".container");

    container.innerHTML = `
    <h1>Update Doctor</h1>
    <form>
        <p>
            <label for="name">Name</label>
            <input name="name" type="text" id="name" value="${doctor.name}">
             <a class="nameErr">Name required!</a>
        </p>
        <p>
            <label for="typeDoc">Type</label>
            <input name="typeDoc" type="text" id="typeDoc" value="${doctor.type}">
             <a class="typeErr">Type required!</a>
        </p>
        <p>
            <label for="patients">Patients</label>
            <input name="patients" type="text" id="patients" value="${doctor.patients}">
             <a class="patientsErr">Patients required!</a>
        </p>

        <div class="submitUpdate">
         <a href="#">Update Doctor</a>
        </div>

          <div class="cancel">
         <a href="#">Cancel</a>
        </div>
        <div class="submitDelete">
         <a href="#">Delete Doctor</a>
        </div>
    </form>
    `

    let cancelButton = document.querySelector(".cancel");
    let submitUpdateButton = document.querySelector(".submitUpdate");
    let submitDeleteButton = document.querySelector(".submitDelete");
    let nameinput = document.getElementById("name");
    let typeinput = document.getElementById("typeDoc");

    nameinput.disabled = true;
    typeinput.disabled = true;

    cancelButton.addEventListener("click", (eve) => {
        createHome("");
    });

    submitUpdateButton.addEventListener("click", (eve) => {
        createUpdateDoctor("update", idDoctor);
    });

    submitDeleteButton.addEventListener("click", (eve) => {

        api(`https://localhost:7111/api/v1/Doctor/delete/${idDoctor}`, "DELETE")
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);


                createHome("deleted");
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    })


}

function createRow(doctor) {


    let tr = document.createElement("tr");

    tr.innerHTML = `
  
				<td class="updateDoc">${doctor.id}</td>
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

function createUpdateDoctor(request, idDoctor) {

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

        if (request === "create") {
            api("https://localhost:7111/api/v1/Doctor/create", "POST", doctor)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    createHome("added");
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else if (request === "update") {
            api(`https://localhost:7111/api/v1/Doctor/update/${idDoctor}`, "PUT", doctor)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    createHome("updated");
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
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

