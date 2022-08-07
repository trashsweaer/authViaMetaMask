import MetaMaskOnboarding from '@metamask/onboarding'
const onboarding = new MetaMaskOnboarding()

const player = document.querySelector('.success-anim')

const btn = document.querySelector('.onboard')
const h1 = document.querySelector('h1')
const desc = document.querySelector('.desc')
const loader = document.querySelector('.loader')
const up = document.querySelector('.up')
const down = document.querySelector('.down')

const isMetamask = () => {
    const { ethereum } = window
    return Boolean(ethereum && ethereum.isMetaMask)
}

const installMetamask = () => {
    onboarding.startOnboarding()
    loader.style.display = 'block'
}

const connect = async () => {
    return await ethereum.request({method: 'eth_accounts'})
}

let connected = (accounts) => {
    h1.innerHTML = 'Connected!'
    desc.classList.add('account')
    desc.innerHTML = accounts[0]
    btn.style.display = 'none'
    loader.style.display = 'none'
    up.style.display = 'none'
    down.style.display = 'block'
    player.play()
    desc.classList.add('account')
}

const metamaskCheck = () => {
    if (!isMetamask()) {
        statusText.innerText = 'You need to install MetaMask in your browser'
        btn.innerText = 'Install MetaMask'
        btn.onclick = installMetamask
    }
    else {

        connect().then((accounts) => {
            if(accounts && accounts[0] > 0) {
                connected(accounts)
            }
            else {
                h1.innerHTML = 'Connect your wallet'
                desc.innerHTML = 'To start, connect via MetaMask'
                btn.innerText = 'Connect MetaMask'
                up.style.display = 'block'
            }
        })

    }
}

btn.addEventListener('click', async () => {
    btn.style.backgroundColor = '#cccccc'
    loader.style.display = 'block'

    try {
        const accs = await ethereum.request({method: 'eth_requestAccounts'})
        connected(accs)
    }
    catch(err) {
        console.error(err)
    }
})

metamaskCheck()