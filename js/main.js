const opportunities = {
    Bryant: {
        name:  "Bryant Fund (Bluegrass Community Foundation) $13,000 Bed-Time Match",
        description: "todo",
        start: new Date(2023, 10, 28, 21, 0, 0, 0),
        end: new Date(2023, 10, 28, 23, 59, 0, 0),
        pool: 13000,
        match: 1,
        limit: 100,
        url: "https://www.bgcf.org/"
    },
    Mcadam: {
        name:  "McAdam Family Foundation $25,000 Match Day",
        description: "todo",
        start: new Date(2023, 10, 29, 9, 0, 0, 0),
        end: new Date(2023, 10, 29, 23, 59, 0, 0),
        pool: 25000,
        match: 1,
        limit: 50,
        url: undefined
    },
    Angel: {
        name:  "Angel Levas Foundation Arts & Community $15,000 Match",
        description: "todo",
        start: new Date(2023, 10, 30, 13, 0, 0, 0),
        end: new Date(2023, 10, 30, 23, 59, 0, 0),
        pool: 15000,
        match: 0.50,
        limit: 125,
        url: "https://www.bgcf.org/stories/evangelos-levas-helping-when-he-can/"
    },
    Marksbury: {
        name:  "Marksbury Family Foundation $60,000 Good Morning Match",
        description: "todo",
        start: new Date(2023, 10, 31, 6, 0, 0, 0),
        end: new Date(2023, 10, 31, 23, 59, 0, 0),
        pool: 60000,
        match: 0.50,
        limit: 250,
        url: "https://marksburyfamilyfoundation.org/"
    },
    Outlaw: {
        name:  "Outlaw State of Kind Hometown $100,000 Encore Match",
        description: "todo",
        start: new Date(2023, 10, 31, 12, 0, 0, 0),
        end: new Date(2023, 10, 31, 23, 59, 0, 0),
        pool: 100000,
        match: 0.50,
        limit: 250,
        url: "https://www.chrisstapleton.com/osok/"
    }
};

const givingWindows = [
    {
        name: "tuesday",
        start: new Date(2023, 10, 28, 21, 0, 0, 0),
        end: new Date(2023, 10, 28, 23, 59, 0, 0),
        matches: ["Bryant"]
    },
    {
        name: "wednesday",
        start: new Date(2023, 10, 29, 9, 0, 0, 0),
        end: new Date(2023, 10, 29, 23, 59, 0, 0),
        matches: ["Mcadam"]
    },
    {
        name: "thursday",
        start: new Date(2023, 10, 30, 13, 0, 0, 0),
        end: new Date(2023, 10, 30, 23, 59, 0, 0),
        matches: ["Angel"]
    },
    {
        name: "friday1",
        start: new Date(2023, 10, 31, 6, 0, 0, 0),
        end: new Date(2023, 10, 31, 11, 59, 0, 0),
        matches: ["Marksbury"]
    },
    {
        name: "friday2",
        start: new Date(2023, 10, 31, 12, 0, 0, 0),
        end: new Date(2023, 10, 31, 23, 59, 0, 0),
        matches: ["Outlaw"]
    }
];

function populateMatchers(id) {
    const ul = document.getElementById(id);
    const matchers = Object.keys(opportunities);
    for (let matcher of matchers) {
        const group = opportunities[matcher];
        const li = document.createElement("li");
        li.setAttribute("id", "group-" + matcher);
        let contents = `<span style='font-weight: bold'>`;
        contents += `${group.name}: </span> <ul>`;
        contents += `<li>Matches at a rate of ${group.match} dollar(s) for every dollar given.</li>`;
        contents += `<li>The maximum match on any gift is $${group.limit}.`;
        contents += ` (So whatever you give past $${group.limit / group.match} is not matched.)</li>`;
        contents += `<li>The total amount of match-money the fund will provide is $${group.pool}.</li>`;
        contents += `<li>The fund's's offer is effective from ${toNiceTime(group.start)} to ${toNiceTime(group.end)} on ${toNiceDay(group.start)}.</li>`
        if (group.url) {
            contents += `To learn more about the fund follow <a href='${group.url}'>this link</a>.</li>`;
        }
        li.innerHTML = contents;
        ul.appendChild(li);
    }
}


function populateTable(id) {

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
        timesContent += `<br>Funders: `;
        for (let matcher of w.matches) {
            timesContent += `<a href=${"#group-"+ matcher}>${matcher}</a> `;
        }
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

function updateOptimizeNarrative(gift) {
    const funds = arrayFrom(opportunities);
    ul = document.createElement("ul");
    funds.sort(function(a, b) {
        if (a.match > b.match) return 1;
        if (a.match < b.match) return -1;
        if (a.limit > b.limit) return 1;
        if (a.limit < b.limit) return -1;
        if (a.pool > b.pool) return 1;
        if (a.pool < b.pool) return -1;
        return 0;
    });
    let current = gift;
    const itemArray = [];
    while (current > 0) {
        const f = funds.pop();
        let part;
        if (funds.length === 0) {
            part = current;
        } else {
            part = Math.min(f.limit / f.match, current);
        }
        const li = document.createElement("li");
        li.setAttribute("start", f.start.toString());
        let contents = `Between ${toNiceTime(f.start)} and ${toNiceTime(f.end)} on ${toNiceDay(f.start)}, `;
        contents += `give $${part}.  Your gift will be increased by $${Math.min(f.limit, current * f.match)} by the ${f.name}.`;
        li.innerText = contents;
        itemArray.push(li);
        current += -part;
    }
    itemArray.sort(function(a, b) {
        const aStart = a.getAttribute("start");
        const bStart = b.getAttribute("start");
        return new Date(aStart) - new Date(bStart);
    });
    itemArray.forEach(function(item) {
        ul.appendChild(item);
    })
    const output = document.getElementById("optimize-output");
    output.innerHTML = "";
    output.appendChild(ul);
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

// simple array from object:
function arrayFrom(obj) {
    const arr = [];
    const keys = Object.keys(obj);
    for (let key of keys) {
        arr.push(obj[key]);
    }
    return arr;
}

/***********************************
 * actions
 ***********************************/

populateMatchers(id = "matchers");
populateTable(id = "diy");
const optimizer = document.getElementById("optimize-input");
updateOptimizeNarrative(gift = Number(optimizer.value));

optimizer.addEventListener("input", function (e) {
    const gift = Number(e.target.value);
    updateOptimizeNarrative(gift);
});
addListeners(id = "diy");
