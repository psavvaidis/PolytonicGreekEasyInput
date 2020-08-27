const keysToUTF = {
    '`': {id: 2, code: '\1FEF', name: 'varia'},
    '~': {id: 3, code: '\0342', name: 'perispomeni'},
    '\'': {id: 5, code: '\0301', name:'oksia'},
    '>': {id: 7, code: '\0486', name: 'psili'},
    '<': {id: 11, code: '\0300', name: 'dasia'},
    ',': {id: 13, code: '\037A', name: 'ipogegrameni'}
}

window.addEventListener('load', function(){

    // Searches for all inputs with 'polytonic-greek' attribute enabled
    var inputAreas = document.querySelectorAll('input[polytonic-greek="true"]')
    // console.log(inputAreas)
    for (const input of inputAreas) {
        
        input.addEventListener('focus', ev => {
            console.log('Focused');
        })

        input.addEventListener('input', ev => {
            console.log('Changed')
            console.log(input.value)
        })
    }

    let polyText = '\u1FCF'
    document.getElementById('result').innerHTML = polyText

    

})






