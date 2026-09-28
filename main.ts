import { cwd } from 'node:process';
import * as readline from 'node:readline/promises';
import util from 'node:util';

using rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function Print() {
    let response = await  fetch('https://retoolapi.dev/vVoZTA/data')
    let adat = await response.json()

    for (const t of adat) {
        console.log(t)
    }
}

async function NewData() {
    let newTanar;
    let nev = await rl.question("Mi az új tanár neve? ")
    let gugu: boolean = false
    if(nev === "") {
        console.log(util.styleText(["yellow"], "A név nem lehet üres!"))
        do {
            let nev2 = await rl.question("Mi az új tanár neve? ")
            if (nev2 === "") {
                console.log(util.styleText(['yellow'], "A név helytelen! \n(Nem lehet üres)"))
            } else {
                gugu = true
            }
        } while (gugu === false)
    }  
    
    let oraSzam = parseInt(await rl.question("Mennyi órát dolgozik?  "))
    let bubu: boolean = false
    if (oraSzam > 7 || oraSzam < 1 || !oraSzam) {
        do {
            let oraSzam2 = parseInt(await rl.question("Mennyi órát dolgozik "))
            if (oraSzam2 >= 1 && oraSzam2 <= 7) {
                console.log("Sikeres óra szám!")
                bubu = true
            } else {
                console.log(util.styleText(["yellow"], "Az óraszám helytelen! \n(1 és 7 között lehet) "))
            }
        } while (bubu === false)
    }

    let napLista: string[] = ["hetfo", "kedd", "szerda", "csutortok", "pentek", "szombat", "vasarnap"];
    let fufu: boolean = false
    let nap = await rl.question('A hét melyik napja? ')
    if (napLista.includes(nap)) {
        console.log("Sikeres!")
    } else {
        do {
            let nap2 = await rl.question('A hét melyik napja? ')

            if (napLista.includes(nap2)) {
                console.log("Sikeres!")
                fufu = true
            }
            else {
                console.log(util.styleText(["yellow"], "Ez a nap helytelen"))
            }
        } while (fufu === false)
    }
    newTanar = {
        nev: nev,
        oraSzam: oraSzam,
        hetNapja: nap
    }

    await fetch(`https://retoolapi.dev/vVoZTA/data`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTanar)
        })
}

async function Del(id: number) {
    await fetch(`https://retoolapi.dev/vVoZTA/data/${id}`, {
        method: "DELETE",
    })
}

async function Delete() {
    let idd = parseInt(await rl.question('A törölni kívánt elem ID: '))
    await Del(idd)
    console.log(util.styleText(["red"], "Törlés sikeres!"))
}

await Print();
await NewData();
await Delete();
