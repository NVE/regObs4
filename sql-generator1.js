const registrationTypes = {
  // All: -1,
  // IkkeGitt: 0,
  GeneralObservation: 10,
  Incident: 11,
  //  Attachment: 12,
  DangerObs: 13,
  DamageObs: 14,
  WeatherObservation: 21,
  SnowSurfaceObservation: 22,
  //  SnowCover: 23,
  AvalancheDangerObs: 24,
  CompressionTest: 25,
  AvalancheObs: 26,
  AvalancheActivityObs2: 33,
  // AvalancheEvaluation: 28,
  // AvalancheEvaluation2: 30,
  AvalancheEvaluation3: 31,
  AvalancheEvalProblem2: 32,
  //  SnowTempObs: 34,
  // SnowDensity: 35,
  SnowProfile: 36,
  // StratProfile: 37,
  IceThickness: 50,
  IceCoverObs: 51,
  //WaterLevel: 61,
  WaterLevel2: 62,
  LandSlideObs: 71,
  // Unknown: 99,
};

const tmpTableName = '#TmpMissingRegistrationRegistrationTs';
console.clear();
console.log('==========================================================================================');
console.log(
  `-- CREATE TABLE ${tmpTableName} (regid NUMERIC not null, changeTime DATETIME not null, tableName VARCHAR(255) not null, tid INT not null)\r\n\r\n` +
    `delete from ${tmpTableName}\r\n\r\n`
);

const sqlQueries = [];

for (let registrationType in registrationTypes) {
  const tid = registrationTypes[registrationType];
  const tableName = registrationType;
  const query =
    `-- Skjema: ${tableName}, TID: (${tid}) \r\n` +
    `INSERT INTO ${tmpTableName} ` +
    `select r.regId, r.DtChangeTime, '${tableName}', ${tid} from ${tableName} skjema ` +
    'inner join Registration r on r.RegID = skjema.RegID ' +
    `left join RegistrationRegistrationT rrt on rrt.RegID = skjema.RegID and rrt.RegistrationTID = ${tid} ` +
    'where rrt.regid is null ' +
    'and skjema.UsageFlagTID = 0 ' +
    'order by r.regid desc';

  sqlQueries.push(query);
}

console.log(sqlQueries.join('\r\n\r\n'));
console.log('\r\n\r\n');
console.log(`select top 100 * from ${tmpTableName} order by changeTime desc\r\n`);
