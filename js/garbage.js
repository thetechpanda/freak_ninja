'use strict';
const email = 'i3YeXT^!a\\a]T'
const shiftChars = (string, cesarC = 13) => {
    let out = ''
    string = '' + string
    for (let c = 0; c < string.length; c++) {
        out += String.fromCharCode(string.charCodeAt(c) + cesarC)
    }
    return out
}

// dom ready function
function ready(f){
    if ( /in/.test(document.readyState) ) {
        requestAnimationFrame(() => ready(f))
    } else {
        f()
    }
}
// email@domain.tld => email [at] domain.tld
let printmail = (string) => string.replace(/@/, '&#32;&#91;&#97;&#116;&#93;&#32;')
// decode uses rot9
let decode = (string) => shiftChars(string)

ready(() => {
    for (let spamblock of document.querySelectorAll('spam')) {
        switch (spamblock.getAttribute('role')) {
            case 'email':
                // handle email block
                spamblock.innerHTML = printmail(decode(email))
                spamblock.title = "email address"
                spamblock.onclick = () => {
                    let e = document.createElement('a')
                    e.href = 'mailto:' + decode(email)
                    e.target = "_blank"
                    document.body.appendChild(e)
                    e.click()
                    document.body.removeChild(e)
                }
                break
        }
    }
})