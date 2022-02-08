import { FeatureCollection, Polygon } from 'geojson';

// #region Geojson

// NB: Lng Lat in geojson.. Leaflet uses Lat Lng
const FEATURE_COLLECTION: FeatureCollection = {
  'type': 'FeatureCollection',
  'features': [
    {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'Polygon',
        'coordinates': [
          [
            [
              30.816650390624996,
              69.79413569863112
            ],
            [
              30.808410644531246,
              69.52875491492895
            ],
            [
              30.173950195312504,
              69.58535422894994
            ],
            [
              30.028381347656246,
              69.41800229742812
            ],
            [
              29.39117431640625,
              69.32413944303502
            ],
            [
              29.04510498046875,
              69.01354605132325
            ],
            [
              28.83087158203125,
              69.22597104241831
            ],
            [
              29.338989257812496,
              69.47682054328423
            ],
            [
              29.132995605468746,
              69.69715072772044
            ],
            [
              28.40789794921875,
              69.81594344791237
            ],
            [
              27.98492431640625,
              70.015894478491
            ],
            [
              27.5701904296875,
              70.06745743428272
            ],
            [
              27.3065185546875,
              69.95479149679258
            ],
            [
              26.47705078125,
              69.94349137330167
            ],
            [
              26.0101318359375,
              69.72191464905208
            ],
            [
              25.7025146484375,
              69.19282413451452
            ],
            [
              25.78216552734375,
              69.0233806574481
            ],
            [
              25.1641845703125,
              68.803020628201
            ],
            [
              24.9114990234375,
              68.60050514574937
            ],
            [
              23.980407714843746,
              68.82783417587025
            ],
            [
              23.170166015625,
              68.63054927011895
            ],
            [
              22.53570556640625,
              68.74235909674526
            ],
            [
              21.6265869140625,
              69.27754058297207
            ],
            [
              21.28326416015625,
              69.31249912982253
            ],
            [
              20.31097412109375,
              68.92384860271805
            ],
            [
              20.33294677734375,
              68.80103434633895
            ],
            [
              19.912719726562496,
              68.35768619207559
            ],
            [
              18.402099609375,
              68.58045336848764
            ],
            [
              18.127441406249996,
              68.53728140042286
            ],
            [
              18.1494140625,
              68.19401187153642
            ],
            [
              17.90496826171875,
              67.96845304770049
            ],
            [
              17.28424072265625,
              68.11736463499349
            ],
            [
              16.7431640625,
              67.91688129785506
            ],
            [
              16.41082763671875,
              67.53272197257299
            ],
            [
              16.388854980468746,
              67.04601992373965
            ],
            [
              16.0345458984375,
              66.91391101065433
            ],
            [
              15.37811279296875,
              66.48259237819617
            ],
            [
              15.4852294921875,
              66.28343241541462
            ],
            [
              15.032043457031248,
              66.15495944163864
            ],
            [
              14.5184326171875,
              66.133854089549
            ],
            [
              14.622802734374998,
              65.8129062926053
            ],
            [
              14.50469970703125,
              65.31412353589782
            ],
            [
              13.699951171875,
              64.64152753972131
            ],
            [
              14.1229248046875,
              64.45621824711147
            ],
            [
              14.15313720703125,
              64.18366059975261
            ],
            [
              13.98834228515625,
              64.01329277121489
            ],
            [
              13.2110595703125,
              64.09500753713654
            ],
            [
              12.68096923828125,
              63.9735506894763
            ],
            [
              12.15087890625,
              63.591340327146554
            ],
            [
              11.97784423828125,
              63.26947621713553
            ],
            [
              12.0465087890625,
              62.612298676168955
            ],
            [
              12.299194335937498,
              62.261531511155
            ],
            [
              12.14263916015625,
              61.722418766105136
            ],
            [
              12.57659912109375,
              61.567189443880316
            ],
            [
              12.873229980468748,
              61.357246826420266
            ],
            [
              12.68646240234375,
              61.05562700886678
            ],
            [
              12.2222900390625,
              61.01572481397616
            ],
            [
              12.60406494140625,
              60.523509074271864
            ],
            [
              12.480468749999998,
              60.071692739989686
            ],
            [
              11.694946289062498,
              59.57328763638666
            ],
            [
              11.815795898437498,
              59.33318942659219
            ],
            [
              11.656494140625,
              58.9216636365964
            ],
            [
              11.343040466308594,
              59.1130671555216
            ],
            [
              11.090011596679688,
              58.99000532803044
            ],
            [
              10.847625732421875,
              59.07021329128137
            ],
            [
              10.660514831542969,
              59.327235165987226
            ],
            [
              10.315475463867188,
              59.045852686812566
            ],
            [
              9.69886779785156,
              58.92414471817596
            ],
            [
              8.249359130859375,
              58.11235171896803
            ],
            [
              7.459716796875001,
              57.98808405905049
            ],
            [
              6.6323089599609375,
              58.06480317906766
            ],
            [
              6.4730072021484375,
              58.250643252119936
            ],
            [
              5.859146118164062,
              58.42688692835143
            ],
            [
              5.541229248046875,
              58.65908502437738
            ],
            [
              5.56182861328125,
              59.1336814082498
            ],
            [
              5.151214599609375,
              59.152698941837905
            ],
            [
              5.20751953125,
              59.49181760086988
            ],
            [
              4.626617431640625,
              61.06094350886341
            ],
            [
              4.8923492431640625,
              61.427275450010534
            ],
            [
              4.818878173828124,
              61.86489235346611
            ],
            [
              5.085296630859375,
              62.196264616146884
            ],
            [
              5.506896972656249,
              62.27335401397472
            ],
            [
              5.9161376953125,
              62.45648663758143
            ],
            [
              6.1578369140625,
              62.69178956429159
            ],
            [
              6.9049072265625,
              62.958969308086814
            ],
            [
              7.781066894531249,
              63.15063398346516
            ],
            [
              7.929382324218749,
              63.52162394005688
            ],
            [
              8.18206787109375,
              63.4750515237761
            ],
            [
              8.71490478515625,
              63.880599207351985
            ],
            [
              8.94561767578125,
              63.67063352942902
            ],
            [
              9.415283203125,
              63.69742111760759
            ],
            [
              9.97833251953125,
              64.18246447089267
            ],
            [
              10.61553955078125,
              64.54017652813491
            ],
            [
              10.56884765625,
              64.94216049820734
            ],
            [
              10.98907470703125,
              65.04085596832707
            ],
            [
              11.2445068359375,
              64.9549533904596
            ],
            [
              11.57958984375,
              65.1253274409527
            ],
            [
              11.86798095703125,
              65.14611484756372
            ],
            [
              11.906433105468748,
              65.55164025925087
            ],
            [
              11.7333984375,
              65.70803822968016
            ],
            [
              12.117919921874998,
              65.95094930095703
            ],
            [
              12.139892578125,
              66.11161893005014
            ],
            [
              12.47222900390625,
              66.27127767491216
            ],
            [
              12.54638671875,
              66.63882326673667
            ],
            [
              12.843017578124998,
              66.64644572965148
            ],
            [
              13.568115234375,
              67.06422254212268
            ],
            [
              14.427795410156248,
              67.33562781287714
            ],
            [
              14.88922119140625,
              67.64058671662393
            ],
            [
              14.548645019531248,
              67.85173760149999
            ],
            [
              15.5181884765625,
              68.18482770360208
            ],
            [
              15.306701660156248,
              68.32930533395773
            ],
            [
              14.757385253906248,
              68.14703189961982
            ],
            [
              13.933410644531248,
              68.14805422620769
            ],
            [
              13.3154296875,
              67.99625418825913
            ],
            [
              13.13690185546875,
              68.13476043212292
            ],
            [
              13.71917724609375,
              68.33538992721655
            ],
            [
              14.2822265625,
              68.34350018861753
            ],
            [
              14.27398681640625,
              68.5814563824722
            ],
            [
              14.52392578125,
              68.84370030023011
            ],
            [
              15.032043457031248,
              69.02534705050161
            ],
            [
              15.328674316406252,
              68.96726440112525
            ],
            [
              15.803833007812498,
              69.2619853290091
            ],
            [
              16.16363525390625,
              69.3348042281603
            ],
            [
              16.204833984375,
              68.99484816896614
            ],
            [
              16.57562255859375,
              69.06660066336936
            ],
            [
              16.86676025390625,
              69.00665920755262
            ],
            [
              16.92169189453125,
              69.41027647783476
            ],
            [
              17.47100830078125,
              69.60737776178779
            ],
            [
              17.74017333984375,
              69.58535422894994
            ],
            [
              18.04779052734375,
              69.7827487816246
            ],
            [
              18.355407714843746,
              69.80836070316398
            ],
            [
              18.489990234374996,
              70.05809185371957
            ],
            [
              19.1876220703125,
              70.29652611323709
            ],
            [
              19.2864990234375,
              70.15715255172064
            ],
            [
              19.624328613281246,
              70.29930397485911
            ],
            [
              20.06927490234375,
              70.17858442263059
            ],
            [
              20.11871337890625,
              69.95667425709935
            ],
            [
              20.56915283203125,
              70.24181834221223
            ],
            [
              21.14593505859375,
              70.04122316986808
            ],
            [
              21.37115478515625,
              70.3916844360438
            ],
            [
              22.2802734375,
              70.30115567367248
            ],
            [
              22.04681396484375,
              70.66269748467985
            ],
            [
              22.862548828125,
              70.7688246201659
            ],
            [
              23.323974609375,
              70.89687576648218
            ],
            [
              23.5382080078125,
              70.77786927721345
            ],
            [
              24.01336669921875,
              70.7180988243322
            ],
            [
              24.5159912109375,
              71.03303495416577
            ],
            [
              25.202636718749996,
              70.90855766673154
            ],
            [
              25.28778076171875,
              71.15939141681443
            ],
            [
              26.02935791015625,
              71.14519471708708
            ],
            [
              25.87005615234375,
              70.75253391771874
            ],
            [
              25.27130126953125,
              70.55874991779058
            ],
            [
              25.3179931640625,
              70.35016483409582
            ],
            [
              25.94970703125,
              70.62446334133946
            ],
            [
              26.015625,
              70.72807296791687
            ],
            [
              26.630859375,
              70.982980127959
            ],
            [
              26.90277099609375,
              70.53588268255716
            ],
            [
              27.213134765625,
              70.82934571366151
            ],
            [
              27.2076416015625,
              71.04909703880152
            ],
            [
              27.6031494140625,
              71.14608231274921
            ],
            [
              28.289794921874996,
              71.09453515423968
            ],
            [
              28.770446777343746,
              70.88878426638139
            ],
            [
              29.377441406249996,
              70.7471007337379
            ],
            [
              30.091552734374996,
              70.71991267426513
            ],
            [
              30.769958496093746,
              70.44323558364887
            ],
            [
              30.30853271484375,
              70.0702662855411
            ],
            [
              30.30853271484375,
              69.88689908234294
            ],
            [
              30.816650390624996,
              69.79413569863112
            ]
          ]
        ]
      }
    }
  ]
};

// #endregion Geojson

export const NORWAY_BOUNDS = FEATURE_COLLECTION.features[0].geometry as Polygon;
