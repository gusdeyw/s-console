<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>S-Console</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body>
    <div class="p-5">
        <div class="rounded-lg border-[#1e1e1e] border-2 ">
            <div class="block text-gray-700 text-sm font-bold my-2 px-3 flex justify-between" for="console">
                <label for="consoleInputField">Console</label>
                <div>
                    <svg id="closeButton" class="bg-[#1e1e1e] cursor-pointer  p-1 text-white rounded-md" width="20"
                        height="20" viewBox="0 0 20 20">
                        <path d="M 3 17 L 17 3 M 3 3 L 17 17" stroke="white" stroke-width="2" fill="black" />
                    </svg>
                </div>
            </div>
            <div class="bg-[#1e1e1e] h-56 overflow-y-auto w-full text-white p-3" id="parent">
                <div class="bg-[#1e1e1e] w-full" id="consoleArea">
                </div>
                <div id="editorArea" class="flex">
                    <p>User> </p>
                    <input id="consoleInputField" class="bg-[#1e1e1e] focus:outline-none w-full" type="text">
                </div>
            </div>
        </div>
    </div>

    <div class="mt-10 p-5">
        <form class="" id="myForm">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="hostname">
                    Command key
                </label>
                <input
                    class="shadow border-[#1e1e1e] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name" name="name" required>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    What to Show
                </label>
                <input
                    class="shadow border-[#1e1e1e] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email" name="email">
            </div>
            <div class="flex items-center justify-left">
                <button
                    class="border-2 border-[#1e1e1e] rounded-xl font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                    Submit
                </button>
            </div>
        </form>
    </div>

    <div class="mt-10 p-5">
        <table class="min-w-full border-[#1e1e1e] border-2 table-fixed">
            <thead class="">
                <tr>
                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left  uppercase ">
                        Command Key
                    </th>
                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left  uppercase ">
                        What to Show
                    </th>
                </tr>
            </thead>
            <tbody class="bg-[#1e1e1e]" id="tableBody">
            </tbody>
        </table>
    </div>

</body>

</html>
<script>
const inputField = document.getElementById('consoleInputField');
const container = document.getElementById('consoleArea');
const parent = document.getElementById('parent');
const closeButton = document.getElementById('closeButton');
const tableBody = document.getElementById('tableBody');

const arrayInputs = [];
const arrayInputsConditions = [];
const arrayCondition = []

function toPush(pa) {
    appender(pa);
}

function appender(param) {
    container.innerHTML += '<p>User> ' + inputField.value + '</p>';
    container.innerHTML += '<p>' + param + '</p>';
    container.innerHTML += '<br>';
    inputField.value = "";
}

function goDown() {
    const objDiv = document.getElementById("parent");
    objDiv.scrollTop = objDiv.scrollHeight;
}

function handleCloseButton() {
    inputField.value = "";
    container.innerHTML = "";
}
closeButton.addEventListener('click', function() {
    handleCloseButton();
});
parent.addEventListener('click', function() {
    inputField.focus();
});
inputField.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        if (inputField.value === "clear") {
            handleCloseButton();
        } else {
            let con1 = 0;
            for (let i = 0; i < arrayInputs.length; i++) {
                if (inputField.value === arrayInputs[i]) {
                    arrayCondition[i]();
                    con1 = 0;
                    break;
                } else {
                    con1 = 1;
                }
            }
            if (con1 === 1) {
                appender(
                    "<span class='text-red-500'>User input are unkown, try to insert some command line below ..</span>"
                );
            }
            goDown();
        }
    }
});
</script>

<script>
const form = document.getElementById("myForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    arrayInputs.push(name);
    arrayInputsConditions.push(email);
    arrayCondition.push(toPush.bind(null, email));
    tableBody.innerHTML +=
        '<tr class="hover:bg-gray-100 dark:hover:bg-gray-700"><td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">' +
        name +
        '</td><td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">' +
        email + '</td></tr>';
    alert("Success !");
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
});
</script>