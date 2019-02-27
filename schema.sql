CREATE TABLE DeepSpace(
isTele                    bool, -- Is it tele?
scoutName                 varchar(25),
eventName                 varchar(20),
teamNo                    int,
matchNumber               int,
alliance                  varchar(4),
autoStartLevel            int,
autoCrossLine             bool,
autoRocketObsured         int,
autoCargoObsured          int,
autoRocketUnobsured       int,
autoCargoUnobsured        int,
NoShow                    bool,
teleRocketObscured        int,
teleCargoObscured         int,
teleRocketUnobscured      int,
teleCargoUnobscured       int,
deadBot                   bool,
climbLevel                int,
assistedClimb             int,
recievedClimb             bool,
PRIMARY KEY	(eventname, teamno, match));