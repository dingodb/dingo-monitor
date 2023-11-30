const data = {
  "coordinator": [
    {
      "name": "coordinator1",
      "host": "172.20.3.93",
      "schemas": [
        {
          "id": 2,
          "name": "DINGO",
          "tableCount": 0
        },
        {
          "id": 1,
          "name": "META",
          "tableCount": 0
        },
        {
          "id": 3,
          "name": "MYSQL",
          "tableCount": 7
        },
        {
          "id": 4,
          "name": "INFORMATION_SCHEMA",
          "tableCount": 10
        }
      ],
      "exceedAlarm": false,
      "process": {
        "processCpuUsage": 0.047,
        "processMemoryDataAndStack": 1976356864,
        "processMemoryResident": 383438848,
        "processMemoryShared": 27131904,
        "processMemoryText": 31363072,
        "processMemoryVirtual": 5967810560,
        "processDiskWriteBytesSecond": 89692,
        "processDiskReadBytesSecond": 0
      },
      "resource": {
        "cpuUsage": 0.2,
        "memUsage": 25,
        "diskUsage": [
          {
            "mountpoint": "/boot",
            "usage": 30
          },
          {
            "mountpoint": "/",
            "usage": 54
          }
        ]
      },
      "leader": true
    },
    {
      "name": "coordinator2",
      "host": "172.20.3.93",
      "schemas": [
        {
          "id": 2,
          "name": "DINGO",
          "tableCount": 0
        },
        {
          "id": 1,
          "name": "META",
          "tableCount": 0
        },
        {
          "id": 3,
          "name": "MYSQL",
          "tableCount": 7
        },
        {
          "id": 4,
          "name": "INFORMATION_SCHEMA",
          "tableCount": 10
        }
      ],
      "exceedAlarm": false,
      "process": {
        "processCpuUsage": 0.03,
        "processMemoryDataAndStack": 1861017600,
        "processMemoryResident": 288088064,
        "processMemoryShared": 26468352,
        "processMemoryText": 31363072,
        "processMemoryVirtual": 5920161792,
        "processDiskWriteBytesSecond": 89239,
        "processDiskReadBytesSecond": 0
      },
      "resource": {
        "cpuUsage": 0.2,
        "memUsage": 25,
        "diskUsage": [
          {
            "mountpoint": "/boot",
            "usage": 30
          },
          {
            "mountpoint": "/",
            "usage": 54
          }
        ]
      },
      "leader": false
    },
    {
      "name": "coordinator3",
      "host": "172.20.3.93",
      "schemas": [
        {
          "id": 2,
          "name": "DINGO",
          "tableCount": 0
        },
        {
          "id": 1,
          "name": "META",
          "tableCount": 0
        },
        {
          "id": 3,
          "name": "MYSQL",
          "tableCount": 7
        },
        {
          "id": 4,
          "name": "INFORMATION_SCHEMA",
          "tableCount": 10
        }
      ],
      "exceedAlarm": false,
      "process": {
        "processCpuUsage": 0.025,
        "processMemoryDataAndStack": 1847185408,
        "processMemoryResident": 281849856,
        "processMemoryShared": 26058752,
        "processMemoryText": 31363072,
        "processMemoryVirtual": 5918732288,
        "processDiskWriteBytesSecond": 88860,
        "processDiskReadBytesSecond": 0
      },
      "resource": {
        "cpuUsage": 0.2,
        "memUsage": 25,
        "diskUsage": [
          {
            "mountpoint": "/boot",
            "usage": 30
          },
          {
            "mountpoint": "/",
            "usage": 54
          }
        ]
      },
      "leader": false
    }
  ],
  "executor": [
    {
      "name": "executor1",
      "host": "172.20.3.93",
      "exceedAlarm": false,
      "resource": {
        "cpuUsage": 0.2,
        "memUsage": 25,
        "diskUsage": [
          {
            "mountpoint": "/boot",
            "usage": 30
          },
          {
            "mountpoint": "/",
            "usage": 54
          }
        ],
        "heapUsage": 0.02,
        "nonHeapSize": 69003496
      }
    }
  ],
  "store": [
    {
      "id": 1001,
      "name": "store1",
      "host": "172.20.3.93",
      "exceedAlarm": false,
      "resource": {
        "cpuUsage": 0.2,
        "memUsage": 25,
        "diskUsage": [
          {
            "mountpoint": "/boot",
            "usage": 30
          },
          {
            "mountpoint": "/",
            "usage": 54
          }
        ]
      },
      "process": {
        "processCpuUsage": 0.016,
        "processMemoryDataAndStack": 1696239616,
        "processMemoryResident": 91774976,
        "processMemoryShared": 25407488,
        "processMemoryText": 31363072,
        "processMemoryVirtual": 5945339904,
        "processDiskWriteBytesSecond": 2048,
        "processDiskReadBytesSecond": 0
      },
      "regions": {
        "regionCount": 17,
        "leaderRegionsCount": 5
      }
    },
    {
      "id": 1002,
      "name": "store2",
      "host": "172.20.3.93",
      "exceedAlarm": false,
      "resource": {
        "cpuUsage": 0.2,
        "memUsage": 25,
        "diskUsage": [
          {
            "mountpoint": "/boot",
            "usage": 30
          },
          {
            "mountpoint": "/",
            "usage": 54
          }
        ]
      },
      "process": {
        "processCpuUsage": 0.016,
        "processMemoryDataAndStack": 1674088448,
        "processMemoryResident": 91525120,
        "processMemoryShared": 25403392,
        "processMemoryText": 31363072,
        "processMemoryVirtual": 5923643392,
        "processDiskWriteBytesSecond": 1229,
        "processDiskReadBytesSecond": 0
      },
      "regions": {
        "regionCount": 17,
        "leaderRegionsCount": 6
      }
    },
    {
      "id": 1003,
      "name": "store3",
      "host": "172.20.3.93",
      "exceedAlarm": false,
      "resource": {
        "cpuUsage": 0.2,
        "memUsage": 25,
        "diskUsage": [
          {
            "mountpoint": "/boot",
            "usage": 30
          },
          {
            "mountpoint": "/",
            "usage": 54
          }
        ]
      },
      "process": {
        "processCpuUsage": 0.019,
        "processMemoryDataAndStack": 1697869824,
        "processMemoryResident": 93429760,
        "processMemoryShared": 25296896,
        "processMemoryText": 31363072,
        "processMemoryVirtual": 5945790464,
        "processDiskWriteBytesSecond": 2048,
        "processDiskReadBytesSecond": 0
      },
      "regions": {
        "regionCount": 17,
        "leaderRegionsCount": 6
      }
    }
  ],
  "index": [
    {
      "id": 1101,
      "name": "index1",
      "host": "172.20.3.93",
      "exceedAlarm": false,
      "resource": {
        "cpuUsage": 0.2,
        "memUsage": 25,
        "diskUsage": [
          {
            "mountpoint": "/boot",
            "usage": 30
          },
          {
            "mountpoint": "/",
            "usage": 54
          }
        ]
      },
      "process": {
        "processCpuUsage": 0.007,
        "processMemoryDataAndStack": 1354473472,
        "processMemoryResident": 61440000,
        "processMemoryShared": 24719360,
        "processMemoryText": 31363072,
        "processMemoryVirtual": 5633384448,
        "processDiskWriteBytesSecond": 0,
        "processDiskReadBytesSecond": 0
      },
      "regions": {
        "regionCount": 0,
        "leaderRegionsCount": 0
      }
    },
    {
      "id": 1102,
      "name": "index2",
      "host": "172.20.3.93",
      "exceedAlarm": false,
      "resource": {
        "cpuUsage": 0.2,
        "memUsage": 25,
        "diskUsage": [
          {
            "mountpoint": "/boot",
            "usage": 30
          },
          {
            "mountpoint": "/",
            "usage": 54
          }
        ]
      },
      "process": {
        "processCpuUsage": 0.005,
        "processMemoryDataAndStack": 1292894208,
        "processMemoryResident": 63053824,
        "processMemoryShared": 24707072,
        "processMemoryText": 31363072,
        "processMemoryVirtual": 5570228224,
        "processDiskWriteBytesSecond": 0,
        "processDiskReadBytesSecond": 0
      },
      "regions": {
        "regionCount": 0,
        "leaderRegionsCount": 0
      }
    },
    {
      "id": 1103,
      "name": "index3",
      "host": "172.20.3.93",
      "exceedAlarm": false,
      "resource": {
        "cpuUsage": 0.2,
        "memUsage": 25,
        "diskUsage": [
          {
            "mountpoint": "/boot",
            "usage": 30
          },
          {
            "mountpoint": "/",
            "usage": 54
          }
        ]
      },
      "process": {
        "processCpuUsage": 0.007,
        "processMemoryDataAndStack": 1280393216,
        "processMemoryResident": 62476288,
        "processMemoryShared": 24850432,
        "processMemoryText": 31363072,
        "processMemoryVirtual": 5559091200,
        "processDiskWriteBytesSecond": 1638,
        "processDiskReadBytesSecond": 0
      },
      "regions": {
        "regionCount": 0,
        "leaderRegionsCount": 0
      }
    }
  ]
};

export default {
  'GET /testApi/queryResponseList': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: data },
      errorCode: 0,
    });
  },
};
