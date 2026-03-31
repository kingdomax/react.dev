import React from "react";

function EmployeeValidationForm() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [employeeId, setEmployeeId] = React.useState("");
    const [date, setDate] = React.useState("");
    const [nameValid, setNameValid] = React.useState(false);
    const [emailValid, setEmailValid] = React.useState(false);
    const [employeeIdValid, setEmployeeIdValid] = React.useState(false);
    const [dateValid, setDateValid] = React.useState(false);

    const handleNameInput = (e) => {
        const inputValue = e.target.value;
        setName(inputValue);
        setNameValid(inputValue.length >= 4 && !/\d/.test(inputValue)); // check not contain number
    };

    const handleEmailInput = (e) => {
        const inputValue = e.target.value;
        setEmail(inputValue);
        setEmailValid(e.target.checkValidity()); // check email validity
    };

    const handleEmployeeIdInput = (e) => {
        const inputValue = e.target.value;
        setEmployeeId(inputValue);
        setEmployeeIdValid(/^\d{6}$/.test(inputValue)); // check exactly 6 digits
    };

    const handleDateInput = (e) => {
        const inputValue = e.target.value;
        setDate(inputValue);
        setDateValid(inputValue !== "" && inputValue <= "2024-04-12"); // compare date
    };

    const handleFormSubmission = (e) => {
        e.preventDefault();
        setName("");
        setEmail("");
        setEmployeeId("");
        setDate("");
        setNameValid(false);
        setEmailValid(false);
        setEmployeeIdValid(false);
        setDateValid(false);
    };

    return (
        <div className="layout-column align-items-center mt-20 ">
            <div
                className="layout-column align-items-start mb-10 w-50"
                data-testid="input-name"
            >
                <input
                    className="w-100"
                    name="name"
                    placeholder="Name"
                    data-testid="input-name-test"
                    type="text"
                    value={name}
                    onChange={handleNameInput}
                />
                {!nameValid && (
                    <p className="error mt-2">
                        Name must be at least 4 characters long and only contain
                        letters and spaces
                    </p>
                )}
            </div>
            <div
                className="layout-column align-items-start mb-10 w-50"
                data-testid="input-email"
            >
                <input
                    className="w-100"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={handleEmailInput}
                />
                {!emailValid && (
                    <p className="error mt-2">
                        Email must be a valid email address
                    </p>
                )}
            </div>
            <div
                className="layout-column align-items-start mb-10 w-50"
                data-testid="input-employee-id"
            >
                <input
                    className="w-100"
                    name="employeeId"
                    placeholder="Employee ID"
                    type="text"
                    value={employeeId}
                    onChange={handleEmployeeIdInput}
                />
                {!employeeIdValid && (
                    <p className="error mt-2">
                        Employee ID must be exactly 6 digits
                    </p>
                )}
            </div>
            <div
                className="layout-column align-items-start mb-10 w-50"
                data-testid="input-joining-date"
            >
                <input
                    className="w-100"
                    name="joiningDate"
                    placeholder="Joining Date"
                    type="date"
                    value={date}
                    onChange={handleDateInput}
                />
                {!dateValid && (
                    <p className="error mt-2">
                        Joining Date cannot be in the future
                    </p>
                )}
            </div>
            <button
                data-testid="submit-btn"
                type="submit"
                disabled={
                    !nameValid || !emailValid || !employeeIdValid || !dateValid
                }
                onClick={handleFormSubmission}
            >
                Submit
            </button>
        </div>
    );
}

export default EmployeeValidationForm;
