// Relic Buff Data and Mapping
const relicBuffData = {
  // Buff descriptions mapping
  buffDescriptions: {
    "162000": "DMG {0}",
    "162001": "HP {0}",
    "162002": "AGI {0}",
    "162003": "WPN DEF {0}",
    "162004": "TAC DEF {0}",
    "162005": "STR {0}",
    "162006": "Bonus DMG {0}",
    "162007": "WPN ATK {0}",
    "162008": "TAC ATK {0}",
    "162009": "TAC DMG {0}",
    "220117": "STR {0}",
    "220118": "INT {0}",
    "220119": "AGI {0}",
    "220120": "VIT {0}",
    "220121": "LUK {0}"
  },
  
  // Map Cultural relic IDs to buff IDs (derived from Cultural_relics_equipTable/buffTable)
  relicToBuffId: {
    // Quality 1 Relics (IDs 1001-1020)
    1001: 1,   // Tri-color Pottery -> WPN ATK +2
    1002: 1,   // Oracle bone script -> WPN ATK +2
    1003: 3,   // Bagua Pattern -> WPN DEF +2
    1004: 4,   // Seeds of Life -> TAC DEF +2
    1005: 5,   // Classic Tea -> STR +3
    1006: 6,   // Copper Coin -> INT +3
    1007: 7,   // Treasure Chest -> AGI +5
    1008: 8,   // The Thinker -> WPN ATK +3
    1009: 9,   // The Scream -> TAC ATK +3
    1010: 10,  // The Great Wave off Kanagawa -> WPN DEF +3
    1011: 11,  // The Code of Hammurabi -> TAC DEF +3
    1012: 12,  // Tiger Tally -> HP +8
    1013: 13,  // The Sword in the Stone -> VIT +5
    1014: 14,  // Seismoscope -> STR +6
    1015: 15,  // Amber -> INT +6
    1016: 16,  // Bronze Chariot -> WPN ATK +5
    1017: 17,  // Bronze Vessel -> TAC ATK +5
    1018: 18,  // Mammoth Ivory -> WPN DEF +10
    1019: 19,  // Tiger Tally -> TAC DEF +10
    1020: 21,  // Tri-color Pottery -> STR +10

    // Quality 2 Relics (selected IDs 2001-2020)
    2001: 7,   // Mummy -> AGI +5
    2002: 5,   // Sacred Mask -> STR +3
    2003: 4,   // Spartan Helmet -> TAC DEF +2
    2004: 2,   // Mona Lisa -> TAC ATK +2
    2005: 5,   // Records of the Grand Historian -> STR +3
    2006: 4,   // Sundial -> TAC DEF +2
    2007: 17,  // Girl with a Pearl Earring -> TAC ATK +5
    2008: 10,  // Genesis -> WPN DEF +3
    2009: 9,   // Blue & White Porcelain -> TAC ATK +3
    2010: 7,   // On the Origin of Species -> AGI +5
    2011: 6,   // Da Vinci's Manuscripts -> INT +3
    2012: 17,  // Galileo Telescope -> TAC ATK +5
    2013: 11,  // Gemstone Necklace -> TAC DEF +3
    2014: 5,   // Moai -> STR +3
    2015: 12,  // Bronze Running Horse -> HP +8
    2016: 13,  // Radium -> VIT +5
    2017: 15,  // Jade Mask -> INT +6
    2018: 17,  // Sunflowers -> TAC ATK +5
    2019: 18,  // Four-goat Square Zun -> WPN DEF +10
    2020: 19,  // Venus de Milo -> TAC DEF +10

    // Quality 3 Relics (selected IDs 3001-3010)
    3001: 21,  // Mona Lisa -> STR +10
    3002: 22,  // Girl with a Pearl Earring -> AGI +10
    3003: 23,  // Trilobite Fossil -> INT +10
    3004: 24,  // Dinosaur Skull -> VIT +15
    3005: 14,  // Bastet -> STR +6
    3006: 17,  // Sunflowers -> TAC ATK +5
    3007: 9,   // The Scream -> TAC ATK +3
    3008: 18,  // The Great Wave off Kanagawa -> WPN DEF +10
    3009: 19,  // A Thousand Li of Rivers and Mountains -> TAC DEF +10
    3010: 21   // Statue of Liberty -> STR +10
  },
  
  // Buff data from Cultural_relics_buffTable.json
  buffs: {
    1: { Id: 1, Para: "21401;2", ShowDes: "162007", Stage: 1000 }, // WPN ATK +2
    2: { Id: 2, Para: "21501;2", ShowDes: "162008", Stage: 2000 }, // TAC ATK +2
    3: { Id: 3, Para: "21601;2", ShowDes: "162003", Stage: 3000 }, // WPN DEF +2
    4: { Id: 4, Para: "21701;2", ShowDes: "162004", Stage: 5000 }, // TAC DEF +2
    5: { Id: 5, Para: "20507;3", ShowDes: "220117", Stage: 7000 }, // STR +3
    6: { Id: 6, Para: "20508;3", ShowDes: "220118", Stage: 10000 }, // INT +3
    7: { Id: 7, Para: "20509;5", ShowDes: "220119", Stage: 20000 }, // AGI +5
    8: { Id: 8, Para: "21401;3", ShowDes: "162007", Stage: 30000 }, // WPN ATK +3
    9: { Id: 9, Para: "21501;3", ShowDes: "162008", Stage: 40000 }, // TAC ATK +3
    10: { Id: 10, Para: "21601;3", ShowDes: "162003", Stage: 50000 }, // WPN DEF +3
    11: { Id: 11, Para: "21701;3", ShowDes: "162004", Stage: 60000 }, // TAC DEF +3
    12: { Id: 12, Para: "21801;8", ShowDes: "162001", Stage: 70000 }, // HP +8
    13: { Id: 13, Para: "20510;5", ShowDes: "220120", Stage: 80000 }, // VIT +5
    14: { Id: 14, Para: "20507;6", ShowDes: "220117", Stage: 90000 }, // STR +6
    15: { Id: 15, Para: "20508;6", ShowDes: "220118", Stage: 100000 }, // INT +6
    16: { Id: 16, Para: "21401;5", ShowDes: "162007", Stage: 120000 }, // WPN ATK +5
    17: { Id: 17, Para: "21501;5", ShowDes: "162008", Stage: 140000 }, // TAC ATK +5
    18: { Id: 18, Para: "21601;10", ShowDes: "162003", Stage: 160000 }, // WPN DEF +10
    19: { Id: 19, Para: "21701;10", ShowDes: "162004", Stage: 180000 }, // TAC DEF +10
    20: { Id: 20, Para: "20081;6", ShowDes: "162080", Stage: 200000 }, // Special buff
    21: { Id: 21, Para: "20507;10", ShowDes: "220117", Stage: 250000 }, // STR +10
    22: { Id: 22, Para: "20509;10", ShowDes: "220119", Stage: 300000 }, // AGI +10
    23: { Id: 23, Para: "20508;10", ShowDes: "220118", Stage: 350000 }, // INT +10
    24: { Id: 24, Para: "20510;15", ShowDes: "220120", Stage: 400000 }, // VIT +15
    25: { Id: 25, Para: "30007;10", ShowDes: "410031", Stage: 450000 }, // Different stat
    26: { Id: 26, Para: "30002;10", ShowDes: "410028", Stage: 500000 }, // Different stat
    27: { Id: 27, Para: "20081;20", ShowDes: "162080", Stage: 600000 }, // Special buff
    28: { Id: 28, Para: "20082;20", ShowDes: "162074", Stage: 700000 }, // Different stat
    29: { Id: 29, Para: "20505;50", ShowDes: "220121", Stage: 800000 } // LUK +50
  },
  
  // Equipment mapping data
  equipMapping: {
    1: { Id: 1, MappingArray: [1, 1, 1] }, // BuffId: 1, Unknown: 1, StageLevel: 1
    2: { Id: 2, MappingArray: [1, 1, 2] }, // BuffId: 1, Unknown: 1, StageLevel: 2
    3: { Id: 3, MappingArray: [2, 1, 1] }, // BuffId: 2, Unknown: 1, StageLevel: 1
    4: { Id: 4, MappingArray: [2, 1, 2] }, // BuffId: 2, Unknown: 1, StageLevel: 2
    5: { Id: 5, MappingArray: [3, 1, 1] }, // BuffId: 3, Unknown: 1, StageLevel: 1
    6: { Id: 6, MappingArray: [3, 1, 2] }, // BuffId: 3, Unknown: 1, StageLevel: 2
    7: { Id: 7, MappingArray: [4, 1, 1] }, // BuffId: 4, Unknown: 1, StageLevel: 1
    8: { Id: 8, MappingArray: [4, 1, 2] }, // BuffId: 4, Unknown: 1, StageLevel: 2
    9: { Id: 9, MappingArray: [5, 1, 1] }, // BuffId: 5, Unknown: 1, StageLevel: 1
    10: { Id: 10, MappingArray: [5, 1, 2] }, // BuffId: 5, Unknown: 1, StageLevel: 2
    11: { Id: 11, MappingArray: [6, 1, 1] }, // BuffId: 6, Unknown: 1, StageLevel: 1
    12: { Id: 12, MappingArray: [6, 1, 2] }, // BuffId: 6, Unknown: 1, StageLevel: 2
    13: { Id: 13, MappingArray: [7, 1, 1] }, // BuffId: 7, Unknown: 1, StageLevel: 1
    14: { Id: 14, MappingArray: [7, 1, 2] }, // BuffId: 7, Unknown: 1, StageLevel: 2
    15: { Id: 15, MappingArray: [8, 1, 1] }, // BuffId: 8, Unknown: 1, StageLevel: 1
    16: { Id: 16, MappingArray: [8, 1, 2] }, // BuffId: 8, Unknown: 1, StageLevel: 2
    17: { Id: 17, MappingArray: [9, 1, 1] }, // BuffId: 9, Unknown: 1, StageLevel: 1
    18: { Id: 18, MappingArray: [9, 1, 2] }, // BuffId: 9, Unknown: 1, StageLevel: 2
    19: { Id: 19, MappingArray: [10, 1, 1] }, // BuffId: 10, Unknown: 1, StageLevel: 1
    20: { Id: 20, MappingArray: [10, 1, 2] } // BuffId: 10, Unknown: 1, StageLevel: 2
  },
  
  // Parse the Para field to extract stat ID and value
  parsePara: function(para) {
    if (!para) return { statId: null, value: null };
    const parts = para.split(';');
    return {
      statId: parts[0],
      value: parts[1] ? parseInt(parts[1]) : null
    };
  },
  
  // Get buff description
  getBuffDescription: function(buffId) {
    const buff = this.buffs[buffId];
    if (!buff) return null;
    
    const descKey = buff.ShowDes;
    const descTemplate = this.buffDescriptions[descKey];
    if (!descTemplate) return `Buff ID: ${buffId}`;
    
    const paraInfo = this.parsePara(buff.Para);
    const value = paraInfo.value || 0;
    
    return descTemplate.replace('{0}', `+${value}`);
  },
  
  // Get buff info for a given relic ID
  getRelicBuffByRelicId: function(relicId) {
    const buffId = this.relicToBuffId[relicId];
    if (!buffId) return null;

    const buff = this.buffs[buffId];
    if (!buff) return null;

    const descKey = buff.ShowDes;
    const descTemplate = this.buffDescriptions[descKey];
    if (!descTemplate) return null;

    const paraInfo = this.parsePara(buff.Para);
    const value = paraInfo.value || 0;

    return {
      buffId,
      description: descTemplate.replace('{0}', `+${value}`),
      stage: buff.Stage
    };
  },
  
  // Format buff display for a relic
  getRelicBuffs: function(relicEquipId) {
    const mapping = this.equipMapping[relicEquipId];
    if (!mapping) return [];
    
    const [buffId, , stageLevel] = mapping.MappingArray;
    const buff = this.buffs[buffId];
    if (!buff) return [];
    
    const descKey = buff.ShowDes;
    const descTemplate = this.buffDescriptions[descKey];
    if (!descTemplate) return [];
    
    const paraInfo = this.parsePara(buff.Para);
    const value = paraInfo.value ? paraInfo.value * stageLevel : 0; // Multiply by stage level
    
    const formattedBuff = descTemplate.replace('{0}', `+${value}`);
    
    return [{
      description: formattedBuff,
      stage: buff.Stage,
      stageLevel: stageLevel
    }];
  }
};

// This file exposes relicBuffData and helpers only.
// Rendering of buffs onto the DOM is handled by common.js (addRelicBuffsToPage).