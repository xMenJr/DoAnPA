async function GetArea() {
    const khuvuc = document.getElementById('khuvuc');
    let response = await fetch('http://localhost:5086/api/Area');
    let data = await response.json();
    data.result.forEach((element, index) => {
        let div = document.createElement('div');
        div.innerHTML = `<a style="cursor:pointer" class="text-decoration-none  text-dark" id="${element.id}" onClick="DirectArea('${element.id}', '${element.name}')">${element.name}</a>`;
        khuvuc.appendChild(div);
    });
    
    // Thêm lớp mb-5 cho phần tử cuối cùng
    if (khuvuc.lastElementChild) {
        khuvuc.lastElementChild.classList.add('mb-5');
    }
}

function DirectArea(Id, Name){
    let FullName = ""
    if(Name == "ĐH - HV Khu vực Miền Nam") {
        FullName = "Miền Nam"
    }else if(Name == "ĐH - HV Khu vực Miền Trung")  {
        FullName = "Miền Trung"
    }else {
        FullName = "Miền Bắc"
    }
    window.location.href = `./area.html?search=${Id}&name=${FullName}`;
}

async function SearchUniversity() {

    const find = document.getElementById('find');

    const urlParams = new URLSearchParams(window.location.search.substring(1));
    const search =  urlParams.get('search');
    const department =  urlParams.get('name');

    if(search == null) {
        let response = await fetch(`http://localhost:5086/api/University/SearchUniversityMajor?search=${department}`);
    let data = await response.json();

    find.innerHTML = `<h6>Tìm thấy <b>${data.totalRecords}</b> trường với ngành nghề <b>${department}</b></h6>`;

    const table = document.createElement('table');
        const tbody = document.createElement('tbody');

        // Tạo hàng tiêu đề
        const headerRow = document.createElement('tr');
        const headers = ['STT', 'Mã trường', 'Tên trường'];
        headers.forEach(headerText => {
            const th = document.createElement('td');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        tbody.appendChild(headerRow);

        data.result.forEach((university, index) => {
            const row = document.createElement('tr');
    
            // Tạo ô số thứ tự
            const tdIndex = document.createElement('td');
            tdIndex.textContent = index + 1;
            row.appendChild(tdIndex);
    
            // Tạo ô mã trường
            const tdCode = document.createElement('td');
            tdCode.textContent = university.code;
            row.appendChild(tdCode);
    
            // Tạo ô tên trường và bọc trong thẻ a
            const tdName = document.createElement('td');
            const a = document.createElement('a');
            a.href = `./university.html?id=${university.id}`;  // Thay đổi URL theo nhu cầu của bạn
            a.textContent = university.name;
            a.classList.add('text-decoration-none', 'fw-bold'); // Thêm các lớp CSS
            a.style.color = "#003B73"
            a.onclick = (event) => {
                event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ a
                InformationUniversity(university.id);
            };
            tdName.appendChild(a);
            row.appendChild(tdName);
    
            tbody.appendChild(row);
        });

        // Thêm tbody vào bảng
        table.appendChild(tbody);
        document.getElementById('table-container').appendChild(table);
    }
    else {
        let response = await fetch(`http://localhost:5086/api/University/SearchUniversity?search=${search}`);
    let data = await response.json();

    find.innerHTML = `<h6>Tìm thấy <b>${data.totalRecords}</b> trường với từ khóa <b>${search}</b></h6>`;

    const table = document.createElement('table');
        const tbody = document.createElement('tbody');

        // Tạo hàng tiêu đề
        const headerRow = document.createElement('tr');
        const headers = ['STT', 'Mã trường', 'Tên trường'];
        headers.forEach(headerText => {
            const th = document.createElement('td');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        tbody.appendChild(headerRow);

        data.result.forEach((university, index) => {
            const row = document.createElement('tr');
    
            // Tạo ô số thứ tự
            const tdIndex = document.createElement('td');
            tdIndex.textContent = index + 1;
            row.appendChild(tdIndex);
    
            // Tạo ô mã trường
            const tdCode = document.createElement('td');
            tdCode.textContent = university.code;
            row.appendChild(tdCode);
    
            // Tạo ô tên trường và bọc trong thẻ a
            const tdName = document.createElement('td');
            const a = document.createElement('a');
            a.href = `./university.html?id=${university.id}`;  // Thay đổi URL theo nhu cầu của bạn
            a.textContent = university.name;
            a.classList.add('text-decoration-none', 'fw-bold'); // Thêm các lớp CSS
            a.style.color = "#003B73"
            a.onclick = (event) => {
                event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ a
                InformationUniversity(university.id);
            };
            tdName.appendChild(a);
            row.appendChild(tdName);
    
            tbody.appendChild(row);
        });

        // Thêm tbody vào bảng
        table.appendChild(tbody);
        document.getElementById('table-container').appendChild(table);
    }
    
}

function InformationUniversity(id) {
    window.location.href = `./university.html?id=${id}`;
}


async function GetInformationUniversity() {
    const nameUniversity = document.getElementById('nameUniversity');
    const list_unstyled = document.getElementById('list-unstyled');

    const urlParams = new URLSearchParams(window.location.search.substring(1));
    const search =  urlParams.get('id');
    
    let response = await fetch(`http://localhost:5086/api/University/gethUniversityById?Id=${search}`);
    let data = await response.json();
    if (data.result == null) {
        window.location.href = 'index.html';
    }
    data = data.result[0];
    console.log(data);
    nameUniversity.innerText = data.name;

    list_unstyled.innerHTML = `
        <li class="p-2">Tên trường: ${data.name}</li>
        <li class="p-2">Mã trường: ${data.code}</li>
        <li class="p-2">Loại trường: ${data.type}</li>
        <li class="p-2">Hệ đào tạo: ${data.trainingSystem}</li>
        <li class="p-2">Địa chỉ: ${data.address}</li>
        <li class="p-2">SĐT: ${data.phoneNumber}</li>
        <li class="p-2">Email: ${data.email}</li>
        <li class="p-2">Website: <a href="${data.website}" class="text-decoration-none" style="cursor : pointer">${data.website}</a></li>
    `
}

async function GetAdmissionsMethodsByIdUniversity() {
    const AdmissionsMethod = document.getElementById('AdmissionsMethod')
    const urlParams = new URLSearchParams(window.location.search.substring(1));
    const search =  urlParams.get('id');
    
    let response = await fetch(`http://localhost:5086/api/AdmissionsMethod/GetByIdUniversity?Id=${search}`);
    let data = await response.json();
    if (data.result == null) {
        window.location.href = 'index.html';
        console.log(data.result)
    }
    let i = 1;
    data.result.forEach((element, index) => {
        AdmissionsMethod.innerHTML += `
            <li id="${element.id}">Phương thức ${i}: ${element.name}</li>
        `
        i++;
    });
}

async function GetOnlyDepartment(){

    const urlParams = new URLSearchParams(window.location.search.substring(1));
    const IdUniversity =  urlParams.get('id');

    
    let response = await fetch(`http://localhost:5086/api/Departments/OnlyName?IdUniversity=${IdUniversity}`);
    let data = await response.json();

    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    // Tạo hàng tiêu đề
    const headerRow = document.createElement('tr');
    const headers = ['STT', 'Tên ngành/Chuyên ngành', 'Mã ĐKXT', 'Học phí'];
    headers.forEach(headerText => {
        const th = document.createElement('td');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    tbody.appendChild(headerRow);

    data.result.forEach((university, index) => {
        const row = document.createElement('tr');

        // Tạo ô số thứ tự
        const tdIndex = document.createElement('td');
        tdIndex.textContent = index + 1;
        row.appendChild(tdIndex);

        // Tạo ô mã trường
        const tdName = document.createElement('td');
        tdName.textContent = university.name;
        row.appendChild(tdName);

        const tdCode = document.createElement('td');
        tdCode.textContent = university.code;
        row.appendChild(tdCode);

        const tdPrice = document.createElement('td');
        tdPrice.textContent = formatCurrencyVND(university.tuition);
        row.appendChild(tdPrice);

        tbody.appendChild(row);
    });

    // Thêm tbody vào bảng
    table.appendChild(tbody);
    document.getElementById('department').appendChild(table);

    
}

async function GetDepartment() {
    const urlParams = new URLSearchParams(window.location.search.substring(1));
    const IdUniversity =  urlParams.get('id');

    
    let response = await fetch(`http://localhost:5086/api/Departments/GetByIdUniversity?Id=${IdUniversity}`);
    let data = await response.json();

    const table1 = document.createElement('table');
    const tbody1 = document.createElement('tbody');

    // Tạo hàng tiêu đề
    const headerRow1 = document.createElement('tr');
    const headers1 = ['STT', 'Tên ngành/Chuyên ngành', 'Mã ĐKXT', 'Tổ hợp môn xét tuyển'];
    headers1.forEach(headerText => {
        const th = document.createElement('td');
        th.textContent = headerText;
        headerRow1.appendChild(th);
    });
    tbody1.appendChild(headerRow1);

    data.result.forEach((university, index) => {
        const row = document.createElement('tr');

        // Tạo ô số thứ tự
        const tdIndex = document.createElement('td');
        tdIndex.textContent = index + 1;
        row.appendChild(tdIndex);

        // Tạo ô mã trường
        const tdName = document.createElement('td');
        tdName.textContent = university.name;
        row.appendChild(tdName);

        const tdCode = document.createElement('td');
        tdCode.textContent = university.code;
        row.appendChild(tdCode);

        const tdPrice = document.createElement('td');
        tdPrice.textContent = university.admissionGroup;
        row.appendChild(tdPrice);

        tbody1.appendChild(row);
    });

    // Thêm tbody vào bảng
    table1.appendChild(tbody1);
    document.getElementById('nganh').appendChild(table1);
}

async function GetPoint() {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const oldYear = currentYear - 1

    const urlParams = new URLSearchParams(window.location.search.substring(1));
    const IdUniversity =  urlParams.get('id');

    
    let response = await fetch(`http://localhost:5086/api/Benchmark/Display?IdUniversity=${IdUniversity}&Year=${currentYear}`);
    let data = await response.json();

    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    // Tạo hàng tiêu đề
    const headerRow = document.createElement('tr');
    const headers = ['STT', 'Ngành', 'Điểm ' + oldYear, 'Điểm ' + currentYear];
    headers.forEach(headerText => {
        const th = document.createElement('td');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    tbody.appendChild(headerRow);

    data.result.forEach((university, index) => {
        const row = document.createElement('tr');

        // Tạo ô số thứ tự
        const tdIndex = document.createElement('td');
        tdIndex.textContent = index + 1;
        row.appendChild(tdIndex);

        // Tạo ô mã trường
        const tdName = document.createElement('td');
        tdName.textContent = university.departments;
        row.appendChild(tdName);

        const tdCode = document.createElement('td');
        tdCode.textContent = university.point1;
        row.appendChild(tdCode);

        const tdPrice = document.createElement('td');
        tdPrice.textContent = university.point2;
        row.appendChild(tdPrice);

        tbody.appendChild(row);
    });

    // Thêm tbody vào bảng
    table.appendChild(tbody);
    document.getElementById('diem').appendChild(table);
}

function formatCurrencyVND(number) {
    // Sử dụng toLocaleString để định dạng số thành kiểu tiền tệ Việt Nam
    return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

async function GetDataArea() {
    const urlParams = new URLSearchParams(window.location.search.substring(1));
    const IdUniversity =  urlParams.get('search');
    const FullName =   urlParams.get('name');
    let response = await fetch(`http://localhost:5086/api/University/SearchArea?Id=${IdUniversity}`);
    let data = await response.json();

    const fullName = document.getElementById("FullName")
    const name = document.getElementById("Name")
    const name1 = document.getElementById("Name1")
    const CurrenYear = document.getElementById("CurrenYear")

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    fullName.innerText = "ĐH - HV Khu vực " + FullName
    name.innerText = FullName
    name1.innerText = FullName
    CurrenYear.innerText = currentYear

    const table = document.createElement('table');
        const tbody = document.createElement('tbody');

        // Tạo hàng tiêu đề
        const headerRow = document.createElement('tr');
        const headers = ['STT', 'Mã trường', 'Tên trường'];
        headers.forEach(headerText => {
            const th = document.createElement('td');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        tbody.appendChild(headerRow);

        data.result.forEach((university, index) => {
            const row = document.createElement('tr');
    
            // Tạo ô số thứ tự
            const tdIndex = document.createElement('td');
            tdIndex.textContent = index + 1;
            row.appendChild(tdIndex);
    
            // Tạo ô mã trường
            const tdCode = document.createElement('td');
            tdCode.textContent = university.code;
            row.appendChild(tdCode);
    
            // Tạo ô tên trường và bọc trong thẻ a
            const tdName = document.createElement('td');
            const a = document.createElement('a');
            a.href = `./university.html?id=${university.id}`;  // Thay đổi URL theo nhu cầu của bạn
            a.textContent = university.name;
            a.classList.add('text-decoration-none', 'fw-bold'); // Thêm các lớp CSS
            a.style.color = "#003B73"
            a.onclick = (event) => {
                event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ a
                InformationUniversity(university.id);
            };
            tdName.appendChild(a);
            row.appendChild(tdName);
    
            tbody.appendChild(row);
        });

        // Thêm tbody vào bảng
        table.appendChild(tbody);
        document.getElementById('score').appendChild(table);
}


async function SearchUniversityBenchmark() {
    let response = await fetch(`http://localhost:5086/api/University`);
    let data = await response.json();
    const table = document.createElement('table');
        const tbody = document.createElement('tbody');

        // Tạo hàng tiêu đề
        const headerRow = document.createElement('tr');
        const headers = ['STT', 'Mã trường', 'Tên trường'];
        headers.forEach(headerText => {
            const th = document.createElement('td');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        tbody.appendChild(headerRow);

        data.result.forEach((university, index) => {
            const row = document.createElement('tr');
    
            // Tạo ô số thứ tự
            const tdIndex = document.createElement('td');
            tdIndex.textContent = index + 1;
            row.appendChild(tdIndex);
    
            // Tạo ô mã trường
            const tdCode = document.createElement('td');
            tdCode.textContent = university.code;
            row.appendChild(tdCode);
    
            // Tạo ô tên trường và bọc trong thẻ a
            const tdName = document.createElement('td');
            const a = document.createElement('a');
            a.href = `./university.html?id=${university.id}`;  // Thay đổi URL theo nhu cầu của bạn
            a.textContent = university.name;
            a.classList.add('text-decoration-none', 'fw-bold'); // Thêm các lớp CSS
            a.style.color = "#003B73"
            a.onclick = (event) => {
                event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ a
                InformationBenchMark(university.id, university.name);
            };
            tdName.appendChild(a);
            row.appendChild(tdName);
    
            tbody.appendChild(row);
        });

        // Thêm tbody vào bảng
        table.appendChild(tbody);
        document.getElementById('table-container').appendChild(table);
}

function InformationBenchMark(idUniversity, Name) {
    window.location.href = `./benchmark.html?id=${idUniversity}&name=${Name}`;
}

async function GetInformationBenchMark() {

    const NameUniversity = document.querySelectorAll("#NameUniversity")
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const oldYear = currentYear - 1

    const urlParams = new URLSearchParams(window.location.search.substring(1));
    const IdUniversity =  urlParams.get('id');
    const name  = urlParams.get("name")

    NameUniversity.forEach(element => {
        element.innerText = name
    });
    

    
    let response = await fetch(`http://localhost:5086/api/Benchmark/Display?IdUniversity=${IdUniversity}&Year=${currentYear}`);
    let data = await response.json();

    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    // Tạo hàng tiêu đề
    const headerRow = document.createElement('tr');
    const headers = ['STT', 'Ngành', 'Điểm ' + oldYear, 'Điểm ' + currentYear];
    headers.forEach(headerText => {
        const th = document.createElement('td');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    tbody.appendChild(headerRow);

    data.result.forEach((university, index) => {
        const row = document.createElement('tr');

        // Tạo ô số thứ tự
        const tdIndex = document.createElement('td');
        tdIndex.textContent = index + 1;
        row.appendChild(tdIndex);

        // Tạo ô mã trường
        const tdName = document.createElement('td');
        tdName.textContent = university.departments;
        row.appendChild(tdName);

        const tdCode = document.createElement('td');
        tdCode.textContent = university.point1;
        row.appendChild(tdCode);

        const tdPrice = document.createElement('td');
        tdPrice.textContent = university.point2;
        row.appendChild(tdPrice);

        tbody.appendChild(row);
    });

    // Thêm tbody vào bảng
    table.appendChild(tbody);
    document.getElementById('table-container').appendChild(table);
}


async function GetAllDepartmentMajor() {
    const conglap = document.getElementById('conglap');
    let response = await fetch(`http://localhost:5086/api/Departments/GetAllDepartmentMajor`);
    let data = await response.json();
    data.result.forEach(department => {
        conglap.innerHTML += `
            <div>
                <a class="text-decoration-none text-dark" onClick="DirectMajorDepartment('${department}')">${department}</a>
            </div>
        `
    });
}

function DirectMajorDepartment(name) {
    window.location.href = `./search.html?name=${name}`;
}


async function SearchUniversityMajor() {

    const find = document.getElementById('find');

    const urlParams = new URLSearchParams(window.location.search.substring(1));
    const search =  urlParams.get('name');

    
    
}
