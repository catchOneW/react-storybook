export default function datePicker() {
    let arr = []
    let d = new Date()
    let y = d.getFullYear()
    let m = d.getMonth() + 1
    let d = d.getDate()
    d.setDate(1)
    d.setMonth(m)
    d.setDate(0)
    let end=d.getDate()
};