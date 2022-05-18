const patient = document.getElementById("patient");
patient.addEventListener('click', () => {
    this.location.href = "/patient/home.html";
})
const admin = document.getElementById("admin")
admin.addEventListener("click", () => {
    this.location.href = "./admin/admin.html"
})