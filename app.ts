
let arl = 0.00522
let ccf = 0.04
let rtf = 0.11

enum arlType {
    risk1 = 0.00522,
    risk2 = 0.01044,
    risk3 = 0.02436,
    risk4 = 0.04350,
    risk5 = 0.06960,
}



const salary = 20000000
let salaryCurrency = 0 //0 cop 1 usd
let trm = 3850.46
let workedDays = 30 //Hallar diferencia entre fechas
let SMMLV = 908526
let fsp: number //Fondo de solidad pensional


//indices: Ordinario 0, integral 1, independiente 2
enum typeOfSalary {
    INDEPENDIENTE = 0.4,
    INTEGRAL = 0.7,
    ORDINARIO = 1
}

const baseSalary = (salary: number, type: keyof typeof typeOfSalary) => salary * typeOfSalary[type]

///SOlo para mostrar base en console
let showBaseSalary = baseSalary(salary, "INDEPENDIENTE")

const netSalary = (salary: number, type: number) => {

    let preNetSalary = baseSalary(salary, "INDEPENDIENTE")

    return salary + workVacation(preNetSalary)
        + holidayBonus(preNetSalary)
        + severance(preNetSalary)
        + interestOnServerancePay(preNetSalary)
        - pension(preNetSalary)
        - health(preNetSalary)
        - psf(salary)
        - retf(preNetSalary)


}

const workVacation = (preNetSalary: number) => preNetSalary * workedDays / 720

const holidayBonus = (preNetSalary: number) => preNetSalary * workedDays / 360

const severance = (preNetSalary: number) => (preNetSalary * workedDays) / 360

const interestOnServerancePay = (preNetSalary: number) => (((preNetSalary * workedDays) / 360) * 0.12)

//Deductions 

const pension = (preNetSalary: number) => (preNetSalary * 0.04)

const health = (preNetSalary: number) => (preNetSalary * 0.04)

const retf = (preNetSalary: number) => (preNetSalary * 0.11)

const psf = (salary: number) => {

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

console.log('salario bruto: ', salary)
console.log('salario base: ', showBaseSalary)
console.log('Vacaciones: ', workVacation(showBaseSalary))
console.log('Prima:', holidayBonus(showBaseSalary))
console.log('Cesantias: ', severance(showBaseSalary))
console.log('Intereses Cesantias: ', interestOnServerancePay(showBaseSalary))
console.log('Aporte Pension: ', pension(showBaseSalary))
console.log('Aporte Salud: ', health(showBaseSalary))
console.log('Fondo de solidaridad: ', psf(salary))
console.log('Retefuente: ', retf(showBaseSalary))
console.log('Salario neto:', netSalary(salary, 1))

