// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SentinelChain {

    enum DeviceStatus { SAFE, LOCKED }

    mapping(string => DeviceStatus) public deviceStatus;

    event InfectionDetected(string deviceId);

    function reportInfection(string memory deviceId) public {
        deviceStatus[deviceId] = DeviceStatus.LOCKED;
        emit InfectionDetected(deviceId);
    }

    function getStatus(string memory deviceId)
        public view returns (DeviceStatus)
    {
        return deviceStatus[deviceId];
    }
}
