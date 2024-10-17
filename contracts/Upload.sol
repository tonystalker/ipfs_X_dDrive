// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract Upload {
    struct Access {
        address user;
        bool access;
    }
    mapping(address => string[]) value;
    mapping(address => mapping(address => bool)) ownership;
    mapping(address => Access[]) accessList;
    mapping(address => mapping(address => bool)) previousData;

    function add(address _user, string memory url) external {
        value[msg.sender].push(url);
    }

    function allow(address _user) external {
        ownership[msg.sender][_user] = true;
        if (previousData[msg.sender][_user]) {
            for (uint i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == _user) {
                    accessList[msg.sender].push(Access(_user, true));
                }
            }
        } else {
            accessList[msg.sender].push(Access(_user, true));
            previousData[msg.sender][_user] = true;
        }
    }

    function deny(address _user) external {
        ownership[msg.sender][_user] = false;
        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == _user) {
                accessList[msg.sender][i].access = false;
            }
        }
    }

    function display(address _user) external view returns (string[] memory) {
        require(
            _user == msg.sender || ownership[msg.sender][_user],
            "You are not allowed to view this data"
        );
        return value[_user];
    }

    function shareAcess() external view returns (Access[] memory) {
        return accessList[msg.sender];
    }
}
