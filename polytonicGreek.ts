let stack = []
let shiftPressed = false

const keysToUTF = {
    // Each Element's id is a prime
    // In this case, multiplying their ids would 
    // give us unique combinations
    '`': {id: 2, code: '\1FEF', name: 'varia'},
    '~': {id: 3, code: '\0342', name: 'perispomeni'},
    '\'': {id: 5, code: '\0301', name:'oksia'},
    '>': {id: 7, code: '\0486', name: 'psili'},
    '<': {id: 11, code: '\0300', name: 'dasia'},
    ',': {id: 13, code: '\037A', name: 'ipogegrameni'}
}

const letterToFinalUTF = {
    'α':{
        2: '\1F70', // varia
        3: '\1FB6', // perispomeni
        5: '\1F71', // oksia
        7: '\1F00', // psili
        11: '\1F01', // dasia
        13: '\1FB3', // ipogegrameni
        14: '\1F02', // psili + varia
        21: '\1F06', // psili + perispomeni
        35: '\1F04' // psili + oksia
        22: '\1F03', // dasia + varia
        33: '\1F07', // dasia + perispomeni
        55: '\1F05', // dasia + oksia
        36: '\1FB2', // varia + ipogegrameni
        39: '\1FB7', // perispomeni + ipogegrameni
        65: '\1FB4', // oksia + ipogegrameni
        91: '\1F80', // psili + ipogegrameni
        143: '\1F81', // dasia + ipogegrameni
        182: '\1F82', // psili + varia + ipogegrameni
        273: '\1F86', // psili + perispomeni + ipogegrameni
        455: '\1F84', // psili + oksia + ipogegrameni
        286: '\1F83', // dasia + varia + ipogegrameni
        429: '\1F87', // dasia + perispomeni + ipogegrameni
        715: '\1F85', // dasia + oksia + ipogegrameni
    },
    'Α':{
        2: '\1FBA', // varia
        3: null, // perispomeni
        5: '\1FBB', // oksia
        7: '\1F08', // psili
        11: '\1F09', // dasia
        13: '\1FBC', // ipogegrameni
        14: '\1F0A', // psili + varia
        21: '\1F0E', // psili + perispomeni
        35: '\1F0C', // psili + oksia
        22: '\1F0B', // dasia + varia
        33: '\1F0F', // dasia + perispomeni
        55: '\1F0D', // dasia + oksia
        36: null, // varia + ipogegrameni
        39: null, // perispomeni + ipogegrameni
        65: null, // oksia + ipogegrameni
        91: '\1F88', // psili + ipogegrameni
        143: '\1F89', // dasia + ipogegrameni
        182: '\1F8A', // psili + varia + ipogegrameni
        273: '\1F8E', // psili + perispomeni + ipogegrameni
        455: '\1F8C', // psili + oksia + ipogegrameni
        286: '\1F8B', // dasia + varia + ipogegrameni
        429: '\1F8F', // dasia + perispomeni + ipogegrameni
        715: '\1F8D' // dasia + oksia + ipogegrameni
    },
    'ε':{
        2: '\1F72', // varia
        3: null, // perispomeni
        5: '\1F73', // oksia
        7: '\1F10', // psili
        11: '\1F11', // dasia
        13: null, // ipogegrameni
        14: '\1F12', // psili + varia
        21: null, // psili + perispomeni
        35: '\1F14', // psili + oksia
        22: '\1F13', // dasia + varia
        33: null, // dasia + perispomeni
        55: '\1F15', // dasia + oksia
        36: '\1F72', // varia + ipogegrameni
        39: null, // perispomeni + ipogegrameni
        65: '\1F73', // oksia + ipogegrameni
        91: '\1F10', // psili + ipogegrameni
        143: '\1F11', // dasia + ipogegrameni
        182: '\1F12', // psili + varia + ipogegrameni
        273: null, // psili + perispomeni + ipogegrameni
        455: '\1F14', // psili + oksia + ipogegrameni
        286: '\1F13', // dasia + varia + ipogegrameni
        429: null, // dasia + perispomeni + ipogegrameni
        715: '\1F15', // dasia + oksia + ipogegrameni
    },
    'Ε':{
        2: '\1FC8', // varia
        3: null, // perispomeni
        5: '\1FC9', // oksia
        7: '\1F18', // psili
        11: '\1F19', // dasia
        13: null, // ipogegrameni
        14: '\1F1A', // psili + varia
        21: null, // psili + perispomeni
        35: '\1F1C', // psili + oksia
        22: '\1F1B', // dasia + varia
        33: null, // dasia + perispomeni
        55: '\1F1D', // dasia + oksia
        36: '\1FC8', // varia + ipogegrameni
        39: null, // perispomeni + ipogegrameni
        65: '\1FC9', // oksia + ipogegrameni
        91: '\1F18', // psili + ipogegrameni
        143: '\1F19', // dasia + ipogegrameni
        182: '\1F1A', // psili + varia + ipogegrameni
        273: null, // psili + perispomeni + ipogegrameni
        455: '\1F1C', // psili + oksia + ipogegrameni
        286: '\1F1B', // dasia + varia + ipogegrameni
        429: null, // dasia + perispomeni + ipogegrameni
        715: '\1F1D', // dasia + oksia + ipogegrameni
    },
    'ι':{
        2: '\1F76', // varia
        3: '\1FD6', // perispomeni
        5: '\1F77', // oksia
        7: '\1F30', // psili
        11: '\1F31', // dasia
        13: null, // ipogegrameni
        14: '\1F32', // psili + varia
        21: '\1F36', // psili + perispomeni
        35: '\1F34', // psili + oksia
        22: '\1F33', // dasia + varia
        33: '\1F37', // dasia + perispomeni
        55: '\1F35', // dasia + oksia
        36: '\1F76', // varia + ipogegrameni
        39: '\1FD6', // perispomeni + ipogegrameni
        65: '\1F77', // oksia + ipogegrameni
        91: '\1F30', // psili + ipogegrameni
        143: '\1F31', // dasia + ipogegrameni
        182: '\1F32', // psili + varia + ipogegrameni
        273: '\1F36', // psili + perispomeni + ipogegrameni
        455: '\1F34', // psili + oksia + ipogegrameni
        286: '\1F33', // dasia + varia + ipogegrameni
        429: '\1F37', // dasia + perispomeni + ipogegrameni
        715: '\1F35', // dasia + oksia + ipogegrameni
    },
    'Ι':{
        2: '\1FDA', // varia
        3: null, // perispomeni
        5: '\1FDB', // oksia
        7: '\1F38', // psili
        11: '\1F39', // dasia
        13: null, // ipogegrameni
        14: '\1F3A', // psili + varia
        21: '\1F3E', // psili + perispomeni
        35: '\1F3C', // psili + oksia
        22: '\1F3B', // dasia + varia
        33: '\1F3F', // dasia + perispomeni
        55: '\1F3D', // dasia + oksia
        36: '\1FDA', // varia + ipogegrameni
        39: null, // perispomeni + ipogegrameni
        65: '\1FDB', // oksia + ipogegrameni
        91: '\1F38', // psili + ipogegrameni
        143: '\1F39', // dasia + ipogegrameni
        182: '\1F3A', // psili + varia + ipogegrameni
        273: '\1F3E', // psili + perispomeni + ipogegrameni
        455: '\1F3C', // psili + oksia + ipogegrameni
        286: '\1F3B', // dasia + varia + ipogegrameni
        429: '\1F3F', // dasia + perispomeni + ipogegrameni
        715: '\1F3D', // dasia + oksia + ipogegrameni
    },
    'η':{
        2: '\1F74', // varia
        3: '\1FC6', // perispomeni
        5: '\1F75', // oksia
        7: '\1F20', // psili
        11: '\1F21', // dasia
        13: '\1FC3', // ipogegrameni
        14: '\1F22', // psili + varia
        21: '\1F26', // psili + perispomeni
        35: '\1F24', // psili + oksia
        22: '\1F23', // dasia + varia
        33: '\1F27', // dasia + perispomeni
        55: '\1F25', // dasia + oksia
        36: '\1FC2', // varia + ipogegrameni
        39: '\1FC7', // perispomeni + ipogegrameni
        65: '\1FC4', // oksia + ipogegrameni
        91: '\1F90', // psili + ipogegrameni
        143: '\1F91', // dasia + ipogegrameni
        182: '\1F92', // psili + varia + ipogegrameni
        273: '\1F96', // psili + perispomeni + ipogegrameni
        455: '\1F94', // psili + oksia + ipogegrameni
        286: '\1F93', // dasia + varia + ipogegrameni
        429: '\1F97', // dasia + perispomeni + ipogegrameni
        715: '\1F95', // dasia + oksia + ipogegrameni
    },
    'Η':{
        2: '\1FCA', // varia
        3: null, // perispomeni
        5: '\1FCB', // oksia
        7: '\1F28', // psili
        11: '\1F29', // dasia
        13: '\1FCC', // ipogegrameni
        14: '\1F2A', // psili + varia
        21: '\1F2E', // psili + perispomeni
        35: '\1F2C', // psili + oksia
        22: '\1F2B', // dasia + varia
        33: '\1F2F', // dasia + perispomeni
        55: '\1F2D', // dasia + oksia
        36: '\1FCA', // varia + ipogegrameni
        39: null, // perispomeni + ipogegrameni
        65: '\1FCB', // oksia + ipogegrameni
        91: '\1F98', // psili + ipogegrameni
        143: '\1F99', // dasia + ipogegrameni
        182: '\1F9A', // psili + varia + ipogegrameni
        273: '\1F9E', // psili + perispomeni + ipogegrameni
        455: '\1F9C', // psili + oksia + ipogegrameni
        286: '\1F9B', // dasia + varia + ipogegrameni
        429: '\1F9F', // dasia + perispomeni + ipogegrameni
        715: '\1F9D', // dasia + oksia + ipogegrameni
    },
    'υ':{
        2: '\1F7A', // varia
        3: '\1FE6', // perispomeni
        5: '\1F7B', // oksia
        7: '\1F50', // psili
        11: '\1F51', // dasia
        13: null, // ipogegrameni
        14: '\1F52', // psili + varia
        21: '\1F56', // psili + perispomeni
        35: '\1F54', // psili + oksia
        22: '\1F53', // dasia + varia
        33: '\1F57', // dasia + perispomeni
        55: '\1F55', // dasia + oksia
        36: '\1F7A', // varia + ipogegrameni
        39: '\1FE6', // perispomeni + ipogegrameni
        65: '\1F7B', // oksia + ipogegrameni
        91: '\1F50', // psili + ipogegrameni
        143: '\1F50', // dasia + ipogegrameni
        182: '\1F52', // psili + varia + ipogegrameni
        273: '\1F56', // psili + perispomeni + ipogegrameni
        455: '\1F54', // psili + oksia + ipogegrameni
        286: '\1F53', // dasia + varia + ipogegrameni
        429: '\1F57', // dasia + perispomeni + ipogegrameni
        715: '\1F55', // dasia + oksia + ipogegrameni
    },
    'Υ':{
        2: '\1FEA', // varia
        3: null, // perispomeni
        5: '\1FEB', // oksia
        7: null, // psili
        11: '\1F59', // dasia
        13: null, // ipogegrameni
        14: null, // psili + varia
        21: null, // psili + perispomeni
        35: null, // psili + oksia
        22: '\1F5B', // dasia + varia
        33: '\1F5F', // dasia + perispomeni
        55: '\1F5D', // dasia + oksia
        36: '\1FEA', // varia + ipogegrameni
        39: null, // perispomeni + ipogegrameni
        65: '\1FEB', // oksia + ipogegrameni
        91: null, // psili + ipogegrameni
        143: '\1F59', // dasia + ipogegrameni
        182: null, // psili + varia + ipogegrameni
        273: null, // psili + perispomeni + ipogegrameni
        455: null, // psili + oksia + ipogegrameni
        286: '\1F5B', // dasia + varia + ipogegrameni
        429: '\1F5F', // dasia + perispomeni + ipogegrameni
        715: '\1F5D', // dasia + oksia + ipogegrameni
    },
    'ο':{
        2: '\1F78', // varia
        3: null, // perispomeni
        5: '\1F79', // oksia
        7: '\1F40', // psili
        11: '\1F41', // dasia
        13: null, // ipogegrameni
        14: '\1F42', // psili + varia
        21: null, // psili + perispomeni
        35: '\1F44', // psili + oksia
        22: '\1F43', // dasia + varia
        33: null, // dasia + perispomeni
        55: '\1F45', // dasia + oksia
        36: '\1F78', // varia + ipogegrameni
        39: null, // perispomeni + ipogegrameni
        65: null, // oksia + ipogegrameni
        91: null, // psili + ipogegrameni
        143: null, // dasia + ipogegrameni
        182: '\1F42', // psili + varia + ipogegrameni
        273: null, // psili + perispomeni + ipogegrameni
        455: '\1F44', // psili + oksia + ipogegrameni
        286: '\1F43', // dasia + varia + ipogegrameni
        429: null, // dasia + perispomeni + ipogegrameni
        715: '\1F45', // dasia + oksia + ipogegrameni
    },
    'Ο':{
        2: '\1FF8', // varia
        3: null, // perispomeni
        5: '\1FF9', // oksia
        7: '\1F48', // psili
        11: '\1F49', // dasia
        13: null, // ipogegrameni
        14: '\1F4A', // psili + varia
        21: null, // psili + perispomeni
        35: '\1F4C', // psili + oksia
        22: '\1F4B', // dasia + varia
        33: null, // dasia + perispomeni
        55: '\1F4D', // dasia + oksia
        36: '\1FF8', // varia + ipogegrameni
        39: null, // perispomeni + ipogegrameni
        65: '\1FF9', // oksia + ipogegrameni
        91: '\1F48', // psili + ipogegrameni
        143: '\1F49', // dasia + ipogegrameni
        182: '\1F4A', // psili + varia + ipogegrameni
        273: null, // psili + perispomeni + ipogegrameni
        455: '\1F4C', // psili + oksia + ipogegrameni
        286: '\1F4B', // dasia + varia + ipogegrameni
        429: null, // dasia + perispomeni + ipogegrameni
        715: '\1F4D', // dasia + oksia + ipogegrameni
    },
    'ω':{
        2: '\1F7C', // varia
        3: '\1FF6', // perispomeni
        5: '\1F7D', // oksia
        7: '\1F60', // psili
        11: '\1F61', // dasia
        13: '\1FF3', // ipogegrameni
        14: '\1F62', // psili + varia
        21: '\1F66', // psili + perispomeni
        35: '\1F64', // psili + oksia
        22: '\1F63', // dasia + varia
        33: '\1F67', // dasia + perispomeni
        55: '\1F65', // dasia + oksia
        36: '\1FF2', // varia + ipogegrameni
        39: '\1FF7', // perispomeni + ipogegrameni
        65: '\1FF4', // oksia + ipogegrameni
        91: '\1FA0', // psili + ipogegrameni
        143: '\1FA1', // dasia + ipogegrameni
        182: '\1FA2', // psili + varia + ipogegrameni
        273: '\1FA6', // psili + perispomeni + ipogegrameni
        455: '\1FA4', // psili + oksia + ipogegrameni
        286: '\1FA3', // dasia + varia + ipogegrameni
        429: '\1FA7', // dasia + perispomeni + ipogegrameni
        715: '\1FA5', // dasia + oksia + ipogegrameni
    },
    'Ω':{
        2: '\1FFA', // varia
        3: null, // perispomeni
        5: '\1FFB', // oksia
        7: '\1F68', // psili
        11: '\1F69', // dasia
        13: '\1FFC', // ipogegrameni
        14: '\1F6A', // psili + varia
        21: '\1F6A', // psili + perispomeni
        35: '\1F6C', // psili + oksia
        22: '\1F6B', // dasia + varia
        33: '\1F6F', // dasia + perispomeni
        55: '\1F6D', // dasia + oksia
        36: '\1FFA', // varia + ipogegrameni
        39: null, // perispomeni + ipogegrameni
        65: '\1FFB', // oksia + ipogegrameni
        91: '\1F68', // psili + ipogegrameni
        143: '\1F69', // dasia + ipogegrameni
        182: '\1FAA', // psili + varia + ipogegrameni
        273: '\1FAE', // psili + perispomeni + ipogegrameni
        455: '\1FAC', // psili + oksia + ipogegrameni
        286: '\1FAB', // dasia + varia + ipogegrameni
        429: '\1FAF', // dasia + perispomeni + ipogegrameni
        715: '\1FAD', // dasia + oksia + ipogegrameni
    }
}

window.addEventListener('load', function(){

    // Searches for all inputs with 'polytonic-greek' attribute enabled
    var inputAreas = document.querySelectorAll('input[polytonic-greek="true"]')
    
    inputAreas.forEach( input => {
        // input.addEventListener('focus', ev => {
        //     console.log('Focused');
        // })

        input.addEventListener('keydown', ev => {
            document.getElementById('result').innerHTML = ''
            if(shiftPressed){
                if (keysToUTF[ev.key]){
                    let keyPressed = keysToUTF[ev.key].name
                    let inputValue = input.value
                    input.value = inputValue.slice(0, -1) + ' ' + keyPressed


                    document.getElementById('result').innerHTML = keyPressed
                }
                shiftPressed = false
            }

            if (ev.keyCode == 16){
                shiftPressed = true
            }
        })
    })
})






