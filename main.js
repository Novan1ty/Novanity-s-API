const Fetch = require('node-fetch')
const Prompt = require('prompt-sync')()

const Message = Prompt('Enter your message: ')
Wheres_My_Water(Message)

async function Wheres_My_Water(Message) {
    const Res = await Fetch('https://api.novan1ty.repl.co/wheresmywater/text=' + Message)
    const Wheres_My_Water = await Res.json()
    console.log(Wheres_My_Water.URL)
}
async function ID() { // 7/1/21; July 1, 2021
    const Res = await Fetch('https://api.novan1ty.repl.co/oc')
    const OC = await Res.json()

    console.log(OC.ID)
}