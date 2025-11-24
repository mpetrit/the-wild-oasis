import React from "react";
import Row from "../ui/Row";
import UpdateSettingForm from "../features/settings/UpdateSettingForm";

function Settings() {
  return (
    <Row>
      <div>Settings</div>
      <UpdateSettingForm />
    </Row>
  );
}

export default Settings;
