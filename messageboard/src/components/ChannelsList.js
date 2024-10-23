import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

import Ajv from "ajv";
import addFormats from "ajv-formats";

function ChannelsList({
  channels = [],
  selectedChannel,
  handleChannelSelect,
  handleDeleteChannel,
  handleCreateChannel,
  createChannelSchema,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("default description");
  const [error, setError] = useState("");

  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);
  const validate = ajv.compile(createChannelSchema);

  const handleOnChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    setError("");
    setDescription("default description");
    const channelData = { name, description };
    const isValid = validate(channelData);
    if (!isValid) {
      setError(ajv.errorsText(validate.errors));
      return;
    }
    try {
      handleCreateChannel(channelData);
      setName("");
    } catch (error) {
      console.log("error message : ", error);
      setError(error);
    }
  };

  return (
    <div>
      <h2>Channels</h2>
      <ul>
        {channels &&
          channels.map((channel) => (
            <li
              key={channel?._id}
              onClick={() => handleChannelSelect(channel)}
              className={
                selectedChannel && selectedChannel._id === channel._id
                  ? "selected-channel"
                  : ""
              }
            >
              {channel.name}
              <FaTrash
                onClick={() => handleDeleteChannel(channel._id)}
                className="delete-icon"
              />
            </li>
          ))}
      </ul>
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="text"
          placeholder="New Channel Name"
          value={name}
          onChange={handleOnChange}
        />
        <button onClick={handleSubmit}>Create Channel</button>
      </div>
    </div>
  );
}

export default ChannelsList;
