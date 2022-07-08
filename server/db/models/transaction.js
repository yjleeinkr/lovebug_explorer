module.exports = (sequelize, DataTypes) => {
  const Tx = sequelize.define(
    "Tx",
    {
      txHash: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
        comment: "트랜잭션 해시",
      },
      sender: {
        type: DataTypes.STRING(66),
        allowNull: false,
        comment: "송신 계정",
      },
      recipient: {
        type: DataTypes.STRING(66),
        allowNull: false,
        comment: "수신 계정",
      },
      value: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: "송금액",
      },
      txFee: {
        type: DataTypes.BIGINT,
        allowNull: false,
        comment: "트랜잭션 수수료",
      },
      gasLimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "지정 최대 가스량",
      },
      gasPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "지정 가스비",
      },
      gasUsed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "실제 가스 사용량",
      },
      blockNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "블럭높이",
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "트랜잭션 채굴 시간",
      },
    },
    { timestamps: false, tableName: "transaction" }
  );

  return Tx;
};
