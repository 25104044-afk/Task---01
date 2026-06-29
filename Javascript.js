if (name === "") {
    alert("Name is required");
    return;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(email)) {
    alert("Invalid Email");
}
