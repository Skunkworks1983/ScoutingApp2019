CREATE TABLE Public.DeepSpace(
isTele                    bool, -- Is it tele?
scoutName                 varchar(25),
eventName                 varchar(20),
teamNo                    int,
match                     int,
alliance                  varchar(4),
autoStartLevel            int,
autoCrossLine             bool,
autoRocketObsured         int,
autoCargoObsured          int,
autoRocketVisible       int,
autoCargoVisible        int,
NoShow                    bool,
teleRocketObscured        int,
teleCargoObscured         int,
teleRocketVisible     int,
teleCargoVisible      int,
deadBot                   bool,
climbLevel                int,
assistedClimb             int,
recievedClimb             bool,
PRIMARY KEY	(eventname, teamno, match));
);
