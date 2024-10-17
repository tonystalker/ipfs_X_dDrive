const hre = require("hardhat");
async function main() {
  const Upload = await hre.ethers.getContractFactory("Upload");
  const upload = await Upload.deploy();
  await upload.waitForDeployment();
  console.log("Upload deployed to:", upload.target);
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
