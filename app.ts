
let arl = 0.00522
let ccf = 0.04
let rtf = 0.11


const salary = 20000000
let salaryCurrency = 0 //0 cop 1 usd
let trm = 3850.46
let workedDays = 30 //Hayar diferencia entre fechas
let SMMLV = 908526
let fsp: number //Fondo de solidad pensional


//indices: Ordinario 0, integral 1, independiente 2
enum typeOfSalary {
    independiente = 0.4,
    integral = 0.7,
    ordinario = 1
}

function baseSalary(salary: number, type: typeOfSalary) {
    if (type == typeOfSalary.ordinario) {
        let baseSalary = salary * typeOfSalary.ordinario
        return baseSalary
    }
    return 0
}

///SOlo para mostrar base en console
let showBaseSalary = baseSalary(salary, 1)

function netSalary(salary: number, type: number) {

    let preNetSalary = baseSalary(salary, 1)

    return salary + workVacation(preNetSalary)
        + holidayBonus(preNetSalary)
        + severance(preNetSalary)
        + interestOnServerancePay(preNetSalary)
        - pension(preNetSalary)
        - health(preNetSalary)
        - psf(salary)
        - retf(preNetSalary)


}

function workVacation(preNetSalary: number) {
    let workVacation = preNetSalary * workedDays / 720
    return workVacation
}

function holidayBonus(preNetSalary: number) {
    let holidayBonus = preNetSalary * workedDays / 360
    return holidayBonus
}

function severance(preNetSalary: number) {
    let severance = (preNetSalary * workedDays) / 360
    return severance
}

function interestOnServerancePay(preNetSalary: number) {
    let interestOnServerancePay = (((preNetSalary * workedDays) / 360) * 0.12)
    return interestOnServerancePay
}

//Deductions 

function pension(preNetSalary: number) {
    let pension = (preNetSalary * 0.04)
    return pension
}

function health(preNetSalary: number) {
    let health = (preNetSalary * 0.04)
    return health
}

function retf(preNetSalary: number) {
    let retf = (preNetSalary * 0.11)
    return retf
}


function psf(salary: number) {

    let fspbase = salary / SMMLV

    if (fspbase >= 4 && fspbase < 16) {
        fsp = salary * 0.01
    } else if (fspbase >= 16 && fspbase < 17) {
        fsp = salary * 0.012

    } else if (fspbase >= 17 && fspbase < 18) {
        fsp = salary * 0.014

    } else if (fspbase >= 18 && fspbase < 19) {
        fsp = salary * 0.016

    } else if (fspbase >= 19 && fspbase < 20) {
        fsp = salary * 0.018
    } else if (fspbase >= 20) {
        fsp = salary * 0.02
    }

    console.log(fspbase)

    return fsp
}

console.log('salario bruto: ' + salary)
console.log('salario base: ' + showBaseSalary)
console.log('Vacaciones: ' + workVacation(showBaseSalary))
console.log('Prima:' + holidayBonus(showBaseSalary))
console.log('Cesantias: ' + severance(showBaseSalary))
console.log('Intereses Cesantias: ' + interestOnServerancePay(showBaseSalary))
console.log('Aporte Pension: ' + pension(showBaseSalary))
console.log('Aporte Salud: ' + health(showBaseSalary))
console.log('Fondo de solidaridad: ' + psf(salary))
console.log('Retefuente: ' + retf(showBaseSalary))
console.log('Salario neto:' + netSalary(salary, 1))

