import { EventEmitter } from 'events'
const ExtensionId = "hblpikjfepdagonlokjihdchgijejfde";


class EIP6963Provider extends EventEmitter {
    constructor() {
        super();
        this.isVictory = true; // Identifier for this wallet
        this.id = 0; // JSON-RPC request ID
        this.cnx = true;
        this.on("newListener",e=>console.log("newListener",e))
    }
    
    isConnected() {
        return this.cnx
    }

    request({ method, params }) {
        this.id += 1;

        return new Promise((resolve, reject) => {

            // Send request to background script
            chrome.runtime.sendMessage(ExtensionId, {
                type: 'WALLET_REQUEST',
                payload: { id: this.id, method, params }
            }, (response) => {
                
                if (response.error) {
                    reject(new Error(response.error.message));
                } else {  
                    resolve(response.result);
                }
            });
        });
    }

    // Enable method for backwards compatibility
    enable() {
        return this.request({ method: 'eth_requestAccounts' });
    }

    getSigner(index) {
        return this.request({ method: 'eth_requestAccounts' });
    }
}

window.addEventListener('message',e=>{

    console.log(e.data)

    if(e.data.target=="victory") {
        providerDetail.provider.emit(e.data.event, e.data.params)
        if(window.ethereum.isVictory && window.ethereum.isConnected()) {
            window.ethereum.emit(e.data.event, e.data.params)
        }
    }
    else if(e.data.target=="victory-select") {

        console.log("provider message",e.data.target,e.data.type)

        if(e.data.type=="loaded") {
            e.source.postMessage({providers: providerList.map(p=>p.info)}, "*")
        }
        else if(e.data.type=="selected") {
            handleProviderSelect(e.data.params)
        }
    }
})

// EIP-6963 provider metadata
const providerDetail = {
    info: {
        uuid: "cc09d9cc-5060-477e-97c8-f33ba29814c4", // Unique identifier
        name: 'Victory Wallet',
        rdns: 'wallet.victory', // Reverse DNS identifier
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAHCRJREFUeF7Nmwd8FNXaxv8zs0kINUBCUZASirQkEEqAIAiCFAWlS1EQA5F2IfQiXZoUkSZIV6QjAgoWQKT3TiihIxAiJQFDyu7M5zm7s5ksi3rv1e/79ge/ZDezc855zvM+bznvKPxjr1ZaoUI3c6Xa7L5iCEV11ADmoSiB4r1hGCiKgq7rqKrqfo/Cr+hGN0PX9orr/Oy2tJs3CyXCGsc/MVXl775pvhLhwYZhlAQlvwIxhmGEWBcswXAt3Dq2+Ez8N18CIHktyklDYRoY8YqiXLwbd+TS3znnvw2APEUrRWiqUgeoC0Z9sQCxs2KHxcLMBZm77V6ga9EmI/5ocQrKDwb6dlVXfoq/enT/3wHEfw1AQNGwAJuqzlWhjAGh5kI8F/SsXTfZYS7GZIEVNJM1JmjACSA2Xdfff3j1+MP/Boj/CoDAYhW/BsoqilLCugCx695e5uKsbPDGEM/vW03DCoaiKHFgnL176Wiz/xSE/wQALahsHX/jSeIGoJ6X3ZFzMalu3WGrSVhtXgDiuWirMFr/Jj63aoqTaeo2wy/7Gwlnf3oC/Fti+W8BUKhQdf8nttRev+vVaFVVspi75zkhExTnrhi49OwpLfBmFn+kHZ4CmXkcUkAZ6ZvqM/PmzX0CiL/0+rcAyFe80kjdMEZ50NDtwrwLmYGBjqrY3EJotXPr7pp2783+rauxaEGmRcr7Gsaou5ePjv5Lq5de5i++gopVnImi9MwY3EBRXV83xLjOGwmKZvH3oU3LZixeutJpCiioigaKHXTx3sBm0+jSpT0+Pr7MmjUfFA3D0MFQBaUlcyR7cPBOh7Z8vnxtJqDltYr45zSJTABhzEq4dLTXX1naXwIgsFjFBYqidDYMQ3W7MbGrquneBPIZfnzZopkojmTavxeDptkYPKQvpYo+h6YaHDhwhE/mLKNqtXAmfjgUu13n1cYt8PHxJzqqLeEVQ1BUlcs3Ehg1cgqazWDJZ1Mkwh0698dms7kMSwitgFbLpAkus9MNQ1mccPnIe38Gwp8C4Nr57mLxmW1OlwxQJYl0yQBD1Vi2eCFhZZ7j9IVrtHkrmpiYaNq2bEgWXwVV1dm8ZR/9B44hZ84sbNm0gpSUFBq+3k7u5JSJI2lQv6oEMz1d5/PVXzN9xkKWLphBWNmixF5OoN3b3VBwMkU3HG7TEswU/zVNw+GQOqhrqjIn/k+Y8EwAhOCl+KYO/P2CUV4jNBfzShQvxtw5U1m8aDkr16xn49rPSE1L5vXWPWjU4BW6d+2AaqSgGAonz17hg9GTXXYn2KOj6w401QcUnd/1hZEjBhBevjjCClLTYc5nK9m2fTvrPp+D4qvRsk1POndpR1TnVrR/pw/Xrt6UC/cMrNw7bxijfNP8Jj9LGJ8FgJYvuFI/w2CSddedcbsiRU3uvaIyfdp46tQMZ9Gy1cyYuYD+fTvxxZqveLFUeTSbjYvnL3Lz+nUnQwSJLCGvGFxOXg4i3JnYN/HOIcmdP38BypYri01TiY09TutWLZg2fR69e3alc/s32LZrLwMGySm6X9bcwhRlRVEH3b1UbKq3fMIrAEFl62QnJSkByJJp96Waq0REhFOsaBFWr9vIsf3fce/XeCZM+Ywt3+1EJ43p08ZSJyJUmsjBQ8c4HXud+fOXSnsXy3PHAK7FOycq/4CA16Yp9OzRlaKFg6gREY6vrw8HT5yna/RADF2hQb0aDOz7HoFBuahaqw0tWzTm8uXr7Nt3WAJqjTcktpBiZMkZlHD2p8eemuAVgHzBlX80DN0d5IgvyUmqImAxiI7qRPu3mtPozY4c+vkrdu09SJ8Bo3mU9BgfzYeI6uE8lz8XvXp1ZfWq9Zw8c4V9e4/IYMcEwDqRTBGioaNpKtWrhRFaoSQtmjfjkxlzSHissHPnHiCdHFmz8Mn0MVSrEkKtem/xzYalfLlyLbPmfuFMn1wsM03D+V7ddvfS4Vf+FIB8wZW+NgyaOn2xmLA1rFXJmyeAvr260LBhHeo17kSewDy0b9OUOjXC0BQDhwFjJ3/Cnl3HyJUrJ8m/JZOebpf2bZqTN3s1J+umrarj5+tHVv+sJCUlMW3GBF4MLgxGuhTeb7f+yK59x7h06Rrbt65k9559TJy6gBs3bmeKQs0x5Xocjo13rxzLFDZnYoBMbBQOGQYytnfSUoaa8vcK5Svw4P6vDO3fjXIVytM5+gOu3YjjpYgQhg2KkW5JU3RSdWjcrDOOdKHWroVbMkPPMNgzgZJ2rDm/KsTTZnOwYeU8smT1d8YJBixd9RXr122gwPPFWDx/OpevXOTDSZ+SlPSY27fjM+oLLvY60SfOrhtVrAlUJgACi1dcoSpqW3OHzFBXFeiRzobVC4kZOIpX67/E9eu36dMvhhEjR5H0OJmzp8+Rlvqb9Puajx8YIrBx2rtpQuKnNZb3pKNpv9ZIT4LjLKiIHSQ1LRUfX3/KlAshIE9WJo8dwbxFy8jup7J91yGmThjGm83fQVd8M6Xibi1TWJlw6ehb5thuAGQ+rxifKqoaKvyoGeSIRWiaQWDeHGz9ejnf7zjAlys30KFdC6pFhJE7ZzZu3vyFmbMWs+/ACR49eowhIkTpmoTvz0herB7FukjP0Ne7SxNuxEGB/AWJrFmZt9q+zgsvFMJP0zh49AyTZ8yjY7u2NKpXjVovv86TFFcs6WF6iqKcUFWi4+Oc9QQ3AHmLhg4GZYKbnoozuJHuTrWTL08AWzYv59vvfubH7bvJHxjAe106ULBgfvbtPcicz5Zz4cJVkpOfSHs3I0bP7M1E/ll1A/Nzk32ZwFF0cgcEUK5MMJ06tqJSaAgPHyWyeNlq4uPvU+fll2hUvzoRNV8jVZifK0y23tM5L4YkXD4y0Q2AKGOhM1c3dFnJMe1fsCAqqj0/7dhD3MVL7N+1kYeP7axevZYvV6wmZ94gfHyz8yTpIffu3ZchrMPhrPF5U3lPynsDwyqUVvNxAuJyoRjkCQwka7YcOOx2Hibep33LpjRp2ojnCwRQsXozypQPJrJKZRYuWoGqCnN0Bktyg1F+QOV9UV6TDMhTtFJDBX2LmLi4wBVKoqkKwwf1pEWLZkTUakKV8PLyZnnz5iN3/kA6d2iG/YmDyHpv4mMT0Vzmup7bfXqr9Vk+s17nmVFaTcUMxIQiiSRpy+aVKJrC7DlL8M+ai3vxd0hMfsSR4xc58PNm1q9Zy/iPZsk5m1mnm5EYjRIuHd2qQCstqOjlDoaiLzHz8wz6wpAB3Wn+RkNat43G0DQGDerDzV/u0LRRJOmpKURFD+DMuWsyQHLGCk4Qn7V4T1H0fO/pKj3fC9cswmThCWrVqMSkSSPwtWls+GY7+YPyMmnKAm7F3+Twrm9Z+9VGxo6fLfXMjBDdrINOCZeKf6HkLFQuj6+P7w5FUUKsBQ6hDioqb7VpIuP5XfuOsmrNRho3boDDnoZNhes34lm8bI1MbQWxnJGc6T8zE95T2Lzl9Bmha+bqsKdIiuRLaJPgQc/3O5Mzl580PUNX2b5zL8m/PWH+rNEyj/jiy40IizTTdcusTqam+b2sBBUtW0DH97Y1ehIXFS6UnwohZTlw8DBzP5nEvIVLiahWmXET5+CwO0T6js0V27tdigsAb9GeldpWAbR+1+ouPfXiaRCc0alwOA49zSnnqg+TRw9gyYpNjBrakx4xI2R6ffJELLfv3H1agnStoATAUPxuew4eFlKGKZOG8tHHs7l6PYFr12+ybOEsps5cQvdu7bHbU+jfdxSJjx5nqud7yxw9hc3b7luB8AaQdfamPYuxcgdkZ+qk4Vy5coOlKzczY/wQWrwTzYulyxAWVp53O7akb78RnDx1LpNLlmMYtoJKvuKVmqMo68wBTAEs/HxBRg3rTVhYWTp2G8D5s2d5oVRZVi2dh+Z4RN9+g9m995wUIW8lrGct0nrts0pgJmDip6ftis/EHE3G+vv60q5VI7p3f4eEh6m8HdWT29evUD6sGl989jE/bPuOiR99yv0HzjzIOqYOLZR8weEJDodDHldZd0HToFGDSIYN7E2P/qPpFdWZsZ8uZN1nU0lMesSAQeM4fPh0RlnMdfNn0dib2HnS35Oj3kD0dI2aCpXDQ5kycRh5c2WhfuteLJo9mX4DRrBg7iTGTpjBN99ud0elHnHJr0pgsYqizuUeWyAuyk6hIWW4cuUy9epEcOvOfaZOHknT9t0Y1KMLG7/dzs6de53lKJdv9lzMU6rr8sHWRf6Ry7OywJuAZoTpovqjUTOyCk0a1OWjT+azed1S+g4cQ1BgDk6cPC8165db8U8xQI4vALDarfhdlJWGDXofm4+Nteu3cPrMZXbvWE3lyDcoV64kr7xUjW+2bOfK1ZvSrjwF9Fk76ymEnpQ02ePNjZogeP4UDCjyQkGaNK7L1h93E3fxBnt2rKNa3ZZUKFeS7t06svHrzWzbfvCpBEmCGFS8kque61RV8RIA1K4Ryoypo4m9eJ3+Qz5i41eLefnV1nw8eSTlywbTq+8H7Nt/xG1T1oMQb0Jo/czTTDyvf1Yc4cxRnIBbI9bq1SrxydQPuBB3hb79P2TD5uW0aNmVieOHUq5UYd6L7svRo+fdxRJTW+TG5S0a5qxIuYIXczfDQkrz2dwJaKpG+04x3Lhzi1rVqjF+7GDOxV1g+IipXLx4RYLlaaveFmSlsVXFvQmoNzN5lrmI75csUZTxI2MoEVyE5m9FkfDwMYULPc+KRbNQNQft3unNyVMX5G2fmqsAwPMYSyxKVF5fb1KbIYN6MnrcbPYeOc2e7atJefyYaZ8sZMWqTVKN5bWuHfH201PYrJN4FiusoHgGR1YgzPF1h4O2rZrQr/d7+GQLoH6jVvTqFUWjehGMnjCdjV9vk4mRNUGT1SmhAXmKhGYSQRFdiQurVAzh2o1rvPJKLQJy56NXVAe2797FsWPn2PL9DpIfJ/Mw8ZE75xYLs4qptx17lmlY/b4nKCaA5mJNADMYZcgMMSBXNhrUq01IxQpUq1iOr77ZycW4C3z/488ULFCA2NiLmfIB9/cFACaN5eCK89Rm5NA+CFe4ZPl6zp2/xokDmyhfuSElSgQzdPC/WLp4MQcOnnYWcS0dH96EzRsLnsUMbwBYhc9TSFXVQUSVirzdoQ1jJn3CjZu3OLhnE1VrteXF0s/zbsfmXL92i/kLVkhX+NTJsxBBq02KMoKqqVQNL8e82RM5G3uR/sM/4oNBPejeeziv1K3NlAnDiIruyaGj5yW1rDmE9VT3j1jwrF33dHlWcE3aZh4jjZcjKzNl0igGjZjCtp9+pnePHqzf+D2TxsVQtnQR3u7ch5OnL2Wkw5ZMVMlXIjxBd+iBVnGQ53t+Gh06vEGPqI7cupdIp3f7kyTy7rbNpa116x7Dz3tPoCjaU/m/VVTNnfbmy60s+LOo0ATZBMH0VoaRSu0a4cz8eDwDh37IkWPHeaIFsHLBNAoXDmTO3IUsWbqW1FRn9Cjm4Y5RDH5V8hYJba5q2jozvDSPljSbIsvgQwf35LXGDYms3ZItGxeyav0Woru0pUevDzh0/DSGPaMFxryxN1u3xgbewBCfeVaPTGaafzPnaL3Oz9eHiKphTJ8yjGFjphHVsR2t3xvEyR3zWbH5AKNGTZYHs57BnvR2IhQ2s0ExiFi8m3KqQZ6AHOTPlwvfLP4oij/vdmzG8nXfE5g7B+cuXKJ926aMGzcTh54xec9dtTLAusteXZKHN3F/VyS+susko+DidNcwf94UxoyZTNXK5bn2Szwtmjbm8y83YdcUHKmPiL99j8REZ8Im1mdlkGKkimywSgFUx22rHcubqwaVwiowdGBPgos/T6qu8tmCLzhzJpY9B44x6+OPqFm1NNVqNMGuOyvAnkGKN4pbRdJTPD2F0Sx+uLXEeT7rToPt9mQO7/ueXXsO03/IWKpUDqFgwbwMGRhDVh+Iu3qLMeNncvz4Gfk9cwPcDBTZYKFC1fOk+abtMMjczubUCYPwiuUpVaIwMf16odn82f7jdvoMGsPs6WN5KTKMBo3bcTfhN/cA3ny4+KMA2DNoEtdaBVhMzGSitFXZLyArsy5X4yy4mMHaW20a0+9fXTlw6Djv/2s4E8cNpW6dSGx+KhPHTyXuajxHjpyS5xru3MHVkwic9BMFEVkSC77cAcNYYl7kDj5kTCCoZlCubDlZfChVsgiPU3Ua148ksnoYL7/akocPRUHi6VM2q61bbdzcadO3Wz2C1XNYEyrrveQ5hQFTJg6hbu2q7D94nE1bdpAtW1bOnL0sa4CnTp0ShwmZ4v9MLFdVZ0lMTCYoWBRFlS1iQmIgkQ0KmxOLdzhSsKcnS/vzz56LGtWqExSYl5dqV6d2rTDKhNYlomplypYpx/IV69w7ZLfbn3L1JgOsbsyqBdYFm3UJa6FW1cQpkUa3qE4cOXqcQ/v3cvLgj/y0+zCr1myQFetTZ2Oxpz8mLf0JWfyyoyp+ch7W+0kdQG10/6osioJZFjcUo77ucFLVVdak89ut6dKpNf5ZfEhLS+XAsXPEXbjKnbs3efXVJrTr+D716oQyMKYno8bP4sTxWMkGz3TY6iGsu2kmOKaZWP9m9SZOFXdQv0F9Jo4dTK/efdi1/yQrP/+Upcu+oEjxF2UuUDuiPL4+NpJTnjBz7gp5iCNe4vsZhRT1B8VaFhcX5C0eOtjQ9QnWZibBAEH7Ht27ULpYASJfipC02vrDbnlMvenbbezZt59aNcKYOW0sy1dt5NN5X/L4tyeyUCJMR3R7mEdkJr2tJWqrqzOFypvnEJvi7+9L1y7t6dKpDVHR/dl96Ag1qwsm1iBP3tzUq1UZm2bw/fc7uXknkY9nzHO6P7NWKXVF9h4NuXf1RMbBiBgwf4lKEel2x6eqooZm5q44m1PIntWXNq1fR8eBrqucPnWWXj2j6d57AKEVyjFr+mgMVaV5mx7cvn2d15s0Yv2Gb11NTJmrvOZCTRHMLIZO8RUTFZmo+L1Fi9fYtHErBZ9/ng1r5mFTFKJ7D2ffwSOMGzuE2TPn06B+HQxDFEcUFi9djYKP+z6m/sgNgBMOQ4m+72q1zaRcQcUrrQDaigmZNiM1wZXyKq7jMkOmDAoVQ8vTrm1T5i/6koExXYmICOO1N7pzJ/4yWzatZvany1j31VYMM2GwNkdYPINggVulNafHEHNQNR9aNW9Gr/fb8XK9lhQqXIQN62aycdMPzJqzjHej3mXt2o1ciI1znmUKxrliBdOjWN2fy6RWJlz2cjgqLhTH45rBIQOjhBk4SKU2XYcCzghRB0c6usOgVMmSjB43irt3blM5vBJt2nfjzp0bHNn9LfcSkxg3cS61alYjZ44sxAwc5yrQZ0zUoYsih5Nzsj3OSGfW7Cn06zuEuq82YtSQGLL42alaoymB+fLz4ei+7N1zkKLFS/Lx3EX8cvUqipqOw67LTjPRhiMOaUzNyRT4iONxg2cfj0steCHsa0MxZIOEOyx2VWECcmSjZ4/ONKwfib+/n2xsSkxKZuT4abRs3pIdO/fx1Veb5UJ2/bCKHDmyMm7CbD5fsYpjB7Zy684vdI4awMOHKdJVOYXPgVB3MelOnd+hw1uvkU0EYbWa0apVU8aOjOHe/YfUrd8eO3YaN36F4KJFOHHiFGOG9yVnDj/JlpTkFOYuXM7qtd+RlpaeCQDTxDRN3ejZV+y1RSZPkdAfFUWpZ7VNMVmbj0DXoFmTejSoF0lF2dNn48TJ02zesoM8Abk5c+Y0hm8Okh7e5cPR/Vm1Zitr13/LRx8O4ZW6NTh69CQjxnzMzdsJGSUqRafQc88xfFh/IqqUZdtPu+ndfyytWzTknXYt6N13BPmfL0LKbwmULx9CUlIibzZpQEiF8jx4kMCFC1f4bttuNn2zTSZnQvSsJuBSlW33rpz48xYZGRcElc2uZ/VJUFQ1i+mnpZBo4txf2L+zg6N9hzbYNBsrV67lSaroAnXwcu0alKtQinv3EnmuYCD79h9n7z6RNeoMGRhNizcay0ZJIVSaOF+T9QSDTm+3pl9MNKvXrGfYqOn4+GajVmRFakVUIvZ8HMULF2Pbzz9z7MQZ2SKTK2c2WrduwbXrN9i6dRuqZpPnhTIStai4SwBTDL8cf71JStRF8xYN66coiuxBM9F0+mJxACo/dE3eVWoSvlaB8MrlKV+mNA8ePeTqtZuUKhFMSIUQ7j94wIyZc6hVO5JLF69z7coNCaLTDgyKFS9C6dKl2LbjR4YOHkwWXx/OnIvldGwclSuGIJqPdu7eyYUL157qDvXMY8z1Z8QiyqC7lw5P9dZJ/oeNksm2JwNF87GpBWb7mbW2JkzCZlN5/bX6tG3dlIBc2cnm78+Dhw94lJzKytVbOH7iGLo9HTQ/2UuUL18QCxYt5ofv9+Ln70N0VAdq16jI48cOuvf7gFwBWcEOERHVaP7GK+TInoWcObOTmJhE8pNUVqzZxLr1W2WM4fmyhvNyw/7DRkn3fXMXCZ1p07TuDofDfXpiFkLlRYaDylVCmDZ1OL6qTXoMcRAhzhKHj5lG3MVfJPD+2bLwYukidHqnA6vXbeLGjVvMmjJWlt1eaxlFZM1atGnzGksWL+DY8Ss8Sf1N2nOv99+jXetX8bEJt6jJEN1ApU//cew/cMyd4ZluW0zJtWE6hjLn3rVjf9g0/UwGWJE1m6Ulyy0CY4atIm1VFZ2goACKFi3C/v0H8PXJim5osrxWs0YoH00aja+qc/vOr8xdvI6GDeryy7XrlCoVTHzCfdnk+K8eb5M7dzZEHtH27Z5cuiTObEUtIBXRIx0eXpFz5y6SmPhEdpebWaFppmZUqWnq39csbQIhmqZ1w+hpxueeg0ttEBopgh4pEhItgku8wIdjBvPkyWPOx17i7IVrZMueg7y5czJ33hKZY/Tp1ZWdu/aQN28emW3WjozAjk7/QRM5f+6SjESdXSEu7VGcHbWZIjxLaq1q6t/bLm+CEFi80kjRPG3uvFUTzGtMwZTH9apK8WIvUK5caS5ejONs7Hk0mw8vlgomIf5X7t5PlF8r9Fw+8gbm4tSpc4gaf82a1XmuYAFOnz1P7Lm4TIcZ5gZYhdmaY/wO0qj7V4///Q9MyIkWqu6f5pfe6/f+t9EGhuwjFnT1LGW7a3YipBVJkWvjnD1ErvqGSEzEvroPTZ39gE6n6Gyzs9YYPLNLN9BmGQ0l5fdyykh/u/8/98iMa37yoSnHbw/kQ1OidmA9tDCZYD3DN9tmrJ+ZC7RqirhOJkGu3MOkuLUibK0rmimuptm2GUnJbyQknP1nH5rydDmir1jXDfnYnNUsrMUQETzJYpF4wMGV5JiiZRY7rCJmsse81gTPWjWygBCnKPyvPzaXCQeRQPmo6lwMyqCQKZWWWZ4hzg+FP87oQTDBMm9kCqrzcyf1Xe1WzjjJ9XyxxQxOGBixdt34v31w0opE/qKVInTVqINBXRSlfsauOpxtba5ne6yLNheXSUNEx7nDLp8i8SywqoryAwr/vx6dfcosCocHG75GSd2h51cURAt5iCv5lZdabdgEyV2EdRVWPQTvpK7r0wzUeJvt//HD055AiGpzzkJnc/nZssrH53UjrYaqafMMw5D9SFZ3lgkYVflVMXA/Pp9qt6Ul/YOPz/8PyFHxCxHfLT0AAAAASUVORK5CYII=' // Base64-encoded icon
    },
    provider:  new EIP6963Provider()
};

// Announce provider on page load
function announceProvider() {

    window.dispatchEvent(new CustomEvent('eip6963:announceProvider', {
        detail: new Proxy( providerDetail, {
            get(target, prop) {
                console.log("EIP6963", prop)
                if(target[prop]==undefined) console.log("EIP6963 unknown prop",prop)
                return target[prop]
            }
        }) 
    }));
}

let providerList = []

// Listen for requestProvider events
window.addEventListener('eip6963:requestProvider', (e) => {
    announceProvider();
    return providerDetail
});

announceProvider();

window.addEventListener("eip6963:announceProvider", async event => {
    const perms = await event.detail.provider.request({ method: 'wallet_getPermissions' });
    if(perms.find(p=>p.parentCapability=="eth_accounts")) {
        const accounts = await event.detail.provider.request({ method: 'eth_requestAccounts' });
        if(accounts?.length>0)
            event.detail.info.account = accounts[0].slice(0,6)+"..."+accounts[0].slice(-4)    
    }
    if(providerList.find(p=>p.info.uuid == event.detail.info.uuid)==undefined) {   
        providerList.push(event.detail)
    }
})
window.dispatchEvent(new Event("eip6963:requestProvider"))


// Legacy provider

let handleProviderSelect

class LegacyProvider extends EventEmitter{
    constructor() {
        super();
        this.isVictory = true; 
        this.isMetaMask = true; 
        this.id = 0; 
        this.on("newListener", ()=>{  })
        this._metamask = new class { isUnlocked() { new Promise(resolve => resolve(true))}}
        this.providers = [this]
        this.currentProvider = null;
    }
    
    isConnected() {
        return true
    }

    getSigner() {
        return this.selectedAddress
    }


    send(data) {
        //console.log("send", data)
        return this.request(data)
    }

    sendAsync(data) {
        //console.log("sendAsync", data)
        return this.request(data)
    }

    request(data) {

        //console.log("legacy request", data)
        
        if(this.currentProvider==null && providerList.length==1) {
            this.currentProvider = providerList[0].provider
        }

        if(this.currentProvider==null && providerList.length>1 && data.method=="eth_requestAccounts") {

            const left = ",left=" + (window.outerWidth-400)/2
            const top = ",top=" + (window.outerHeight-300)/2
           
            window.providers = providerList

            const popupWindow = window.open(
                'chrome-extension://hblpikjfepdagonlokjihdchgijejfde/html/select.html',
                'popupWindow',           // Window name
                'popup=yes,toolbar=no,titlebar=no,width=400,height=300'+left+top // Window features
            );


            return new Promise(async (resolve, reject) => {

                handleProviderSelect = (uuid)=>{

                    if(uuid==null) {
                        reject()
                    }
                    else{
                        this.currentProvider = providerList.find(p=>p.info.uuid==uuid).provider
                        this.currentProvider.request(data)
                        .then(r=>resolve(r))
                        .catch(e=>{
                            this.currentProvider = null
                            reject(e)
                        })
                    }
                }                
            })
        }
        return this.currentProvider.request(data)
    }

    // Enable method for backwards compatibility
    enable() {
        console.log("enable")
        return new Promise(async (resolve, reject) => {
            this.request({ method: 'eth_requestAccounts' })
            .then(res=>{
                this.selectedAddress = res[0]
                resolve(res)
            })
            .catch(e=>reject(e))
        })
    }
}

try{

    Object.defineProperty(window, 'ethereum', {
        value: new Proxy({currentProvider :new LegacyProvider()}, {
        get(target, prop) {
            if(target[prop]!=undefined)
                return target[prop]
            else if(target.currentProvider) {
                return target.currentProvider[prop]
            }
        }
    }) ,
        writable: false,
        configurable: false
    });


    Object.defineProperty(window, 'web3', {
        value: new Proxy({currentProvider : new LegacyProvider()}, {
        get(target, prop) {
            return target[prop]
        }
    }) ,
        writable: false,
        configurable: false
    });
}
catch{

}
