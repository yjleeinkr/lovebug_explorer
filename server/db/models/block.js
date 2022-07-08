module.exports = (sequelize, DataTypes) => {
  const Block = sequelize.define(
    "Block",
    {
      hash: {
        type: DataTypes.STRING(66),
        allowNull: false,
        comment: "블럭해시",
      },
      number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "블럭높이",
      },
      miner: {
        type: DataTypes.STRING(42),
        allowNull: false,
        comment: "채굴자",
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "블럭 생성 시간",
      },
      difficulty: {
        type: DataTypes.BIGINT,
        allowNull: false,
        comment: "블럭 난이도",
      },
      gasLimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "총 가스 리밋",
      },
      gasUsed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "실제 가스 사용량",
      },
      nonce: {
        type: DataTypes.STRING(64),
        allowNull: false,
        comment: "논스값",
      },
      transaction: {
        type: DataTypes.TEXT,
        comment: "트랜잭션 데이터",
      },
    },
    {
      timestamps: false,
      tableName: "block",
    }
  );
  return Block;
};
