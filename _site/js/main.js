const opportunities = {
    bryant: {
        name:  "Bryant Fund $13,000 Bed-Time Match",
        description: "todo",
        pool: 13000,
        match: 1,
        limit: 100
    },
    mcadam: {
        name:  "McAdam Family  Foundation $25,000 Match Day",
        description: "todo",
        pool: 25000,
        match: 1,
        limit: 50
    },
    angel: {
        name:  "Angel Levas Foundation Arts & Community $15,000 Match",
        description: "todo",
        pool: 15000,
        match: 0.50,
        limit: 125
    },
    marksbury: {
        name:  "Marksbury Family Foundation $60,000 Good Morning Match",
        description: "todo",
        pool: 60000,
        match: 0.50,
        limit: 250
    },
    outlaw: {
        name:  "Outlaw State of Kind Hometown $100,000 Encore Match",
        description: "todo",
        pool: 100000,
        match: 0.50,
        limit: 250
    }
};

const givingWindows = [
    {
        name: "tuesday",
        start: new Date(2023, 10, 28, 21, 0, 0, 0),
        end: new Date(2023, 10, 28, 23, 59, 0, 0),
        matches: ["bryant"]
    },
    {
        name: "wednesday",
        start: new Date(2023, 10, 29, 9, 0, 0, 0),
        end: new Date(2023, 10, 29, 23, 59, 0, 0),
        matches: ["mcadam"]
    },
    {
        name: "thursday",
        start: new Date(2023, 10, 30, 13, 0, 0, 0),
        end: new Date(2023, 10, 30, 23, 59, 0, 0),
        matches: ["angel"]
    },
    {
        name: "friday1",
        start: new Date(2023, 10, 31, 6, 0, 0, 0),
        end: new Date(2023, 10, 31, 11, 59, 0, 0),
        matches: ["marksbury"]
    },
    {
        name: "friday2",
        start: new Date(2023, 10, 31, 12, 0, 0, 0),
        end: new Date(2023, 10, 31, 23, 59, 0, 0),
        matches: ["marksbury", "outlaw"]
    }
];

populateTable(id = "diy");
addListeners(id = "diy");

// populate diy table

function populateTable(id) {

    function toNiceTime(date) {
        return date.toLocaleTimeString(
            ["en"], { hour: 'numeric', minute: '2-digit' }
        );
    }

    function toNiceDay(date) {
        return date.toLocaleDateString(
            ["en"], { weekday: 'long', month: "short", day: 'numeric' }
        );
    }

    const tab = document.querySelector("#" + id);

    const thead = document.createElement("thead");
    let headerContents = `<tr><th>You Give ($)</th>`;
    headerContents += `<th>Between</th>`;
    headerContents += `<th>We Get</th>`;
    headerContents += `<tr>`;
    thead.innerHTML = headerContents;
    tab.appendChild(thead);
    const tbody = document.createElement("tbody");

    givingWindows.forEach(function(w) {

        const totalGiven = document.createElement("td");
        const totalReceived = document.createElement("td");
        
        const row = document.createElement("tr");
        row.className = "data-row";
        row.setAttribute('window', w.name);

        const gift = document.createElement("td");
        gift.className = "gift";
        const inputElement = document.createElement("input");
        inputElement.type = "number";
        inputElement.value = 0;
        gift.appendChild(inputElement);
        row.appendChild(gift);

        const times = document.createElement("td");
        let timesContent = `${toNiceTime(w.start)} and ${toNiceTime(w.end)} `;
        timesContent += `on ${toNiceDay(w.start)}`;
        times.innerHTML = timesContent;
        row.appendChild(times);

        const received = document.createElement("td");
        received.className = "receipt";
        received.innerHTML = "0";
        row.appendChild(received);

        tbody.appendChild(row);
    })

    const totalHeaderRow = document.createElement("tr");
    let trContents = `<tr><th>Total You Give ($)</th>`;
    trContents += `<th></th>`;
    trContents += `<th>Total We Get</th>`;
    trContents += `<tr>`;
    totalHeaderRow.innerHTML = trContents;
    tbody.appendChild(totalHeaderRow);

    const totalDataRow = document.createElement("tr");
    let tdContents = `<tr><td id="total-gift">0</td>`;
    tdContents += `<td></td>`;
    tdContents += `<td id="total-receipt">0</td>`;
    tdContents += `<tr>`;
    totalDataRow.innerHTML = tdContents;
    tbody.appendChild(totalDataRow);

    tab.appendChild(tbody);
}

function addListeners(id) {
    const dataRows = document.querySelectorAll("#" + "diy" + " .data-row");
    dataRows.forEach(function(row) {
        const gift = row.querySelector(".gift");
        const receipt = row.querySelector(".receipt");
        const windowForRow = givingWindows.filter(w => w.name === row.getAttribute("window"))[0];
        function listenerFactory(w, g, r) {
            const f = function(e) {
                const giftTotal = document.getElementById("total-gift");
                const receiptTotal = document.getElementById("total-receipt");
                let amount = e.target.value;
                let giftTotalValue = 0;
                dataRows.forEach(function(row) {
                    const gift = row.querySelector(".gift input");
                    giftTotalValue += Number(gift.value);
                });
                giftTotal.innerText = giftTotalValue;
                received = computeReceipt(
                    win = w,
                    amount = amount
                );
                receiptTotal.innerText = receiptTotal.innerText - r.innerText + received;
                r.innerText = received;
        }
        return f;
        }
        gift.addEventListener("input", listenerFactory(w = windowForRow, g = gift, r = receipt));
    })
}

function computeReceipt(win, amount) {
    amount = Number(amount);
    let received = amount;
    win.matches.forEach(function(match) {
        const m = opportunities[match];
        if (amount <= m.limit) {
            received += amount * (m.match);
        } else {
            received += m.limit;
        }
    })
    return received;
}