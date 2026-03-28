import React from "react";
import "./App.css";
import "h8k-components";
import Search from "./components/Search";
import Records from "./components/Records";
import medical_records from "./medicalRecords_data";

const title = "Patient Medical Records";

const App = () => {
    const numberOfPatients = medical_records.length;
    const [recordId, setRecordId] = React.useState(0);
    const [showRecord, setShowRecord] = React.useState(false);

    const setNextId = () => {
        setRecordId(recordId + 1 > numberOfPatients ? 1 : recordId + 1);
        setShowRecord(true);
    };

    return (
        <div className="App">
            <h8k-navbar header={title}></h8k-navbar>
            <div className="content">
                <Search
                    id={recordId}
                    setRecordId={setRecordId}
                    setShowRecord={setShowRecord}
                />
                <Records
                    shouldShow={showRecord}
                    id={recordId}
                    setNextId={setNextId}
                />
            </div>
        </div>
    );
};

function Records({ shouldShow, id, setNextId }) {
    if (!shouldShow || id <= 0) {
        return null;
    }

    const patientRecord = medical_records.find(
        (mr) => Number(mr.id) === id,
    )?.data;

    return (
        <div className="patient-profile-container" id="profile-view">
            <div className="layout-row justify-content-center">
                <div
                    id="patient-profile"
                    data-testid="patient-profile"
                    className="mx-auto"
                >
                    <h4 id="patient-name">
                        {patientRecord?.[0]?.userName ?? "Patient Name"}
                    </h4>
                    <h5 id="patient-dob">
                        DOB: {patientRecord?.[0]?.userDob ?? ""}
                    </h5>
                    <h5 id="patient-height">
                        Height: {patientRecord?.[0]?.meta?.height + " cm" ?? ""}
                    </h5>
                </div>
                <button
                    className="mt-10 mr-10"
                    data-testid="next-btn"
                    onClick={() => setNextId()}
                >
                    Next
                </button>
            </div>

            <table id="patient-records-table">
                <thead id="table-header">
                    <tr>
                        <th>SL</th>
                        <th>Date</th>
                        <th>Diagnosis</th>
                        <th>Weight</th>
                        <th>Doctor</th>
                    </tr>
                </thead>
                <tbody id="table-body" data-testid="patient-table">
                    {patientRecord?.map((r, idx) => (
                        <tr key={`record-${idx}`}>
                            <td>{idx + 1}</td>
                            <td>
                                {new Date(r.timestamp).toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "2-digit",
                                        day: "2-digit",
                                        year: "numeric",
                                    },
                                )}
                            </td>
                            <td>{r.diagnosis?.name ?? ""}</td>
                            <td>{r.meta?.weight ?? ""}</td>
                            <td>{r.doctor?.name ?? ""}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function Search({ id, setRecordId, setShowRecord }) {
    const patientList =
        medical_records?.map((mr) => {
            return {
                id: Number(mr.id),
                name: mr.data[0]?.userName ?? "",
            };
        }) ?? [];

    const selectRecordId = (e) => {
        const newId = Number(e.target.value);

        if (newId > 0) {
            console.log(Number(e.target.value));
            setRecordId(newId);
        }
    };

    const handleShowBtn = () => {
        if (id <= 0) {
            console.log("Please select a patient name");
            alert("Please select a patient name");
            return;
        }

        console.log("show");
        setShowRecord(true);
    };

    return (
        <div className="layout-row align-items-baseline select-form-container">
            <div className="select">
                <select
                    data-testid="patient-name"
                    defaultValue={0}
                    onChange={(e) => selectRecordId(e)}
                >
                    <option value={0} disabled>
                        Select Patient
                    </option>
                    {patientList.map((patient) => (
                        <option
                            key={`patient-${patient.id}`}
                            value={patient.id}
                        >
                            {patient.name}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit" data-testid="show" onClick={handleShowBtn}>
                Show
            </button>
        </div>
    );
}
