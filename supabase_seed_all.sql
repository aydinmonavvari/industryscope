-- IndustryScope — Seed operational data (organizations, sites, products, inventory, shipments, alerts, risks, recs)
DELETE FROM "InventoryItem"; DELETE FROM "Shipment"; DELETE FROM "Alert"; DELETE FROM "Risk"; DELETE FROM "Recommendation"; DELETE FROM "Product"; DELETE FROM "Supplier"; DELETE FROM "Warehouse"; DELETE FROM "Facility"; DELETE FROM "Site"; DELETE FROM "OrganizationMember"; DELETE FROM "Organization";
INSERT INTO "Organization" ("id","name","industry","region","currency","createdAt","updatedAt") VALUES ('cmtpi68by0000p3ujczp68x6o','Pars Industrial Group','Manufacturing & Distribution','Middle East','USD',NOW(),NOW());
INSERT INTO "Site" ("id","organizationId","name","type","region","lat","lng","createdAt") VALUES ('cmtpi68c7000qp3ujrzayt26d','cmtpi68by0000p3ujczp68x6o','Tehran Factory','factory','Tehran',35.6892,51.389,NOW());
INSERT INTO "Site" ("id","organizationId","name","type","region","lat","lng","createdAt") VALUES ('cmtpi68c7000sp3uj8f22dlk1','cmtpi68by0000p3ujczp68x6o','Qom Warehouse','warehouse','Qom',34.6401,50.8764,NOW());
INSERT INTO "Site" ("id","organizationId","name","type","region","lat","lng","createdAt") VALUES ('cmtpi68c8000up3ujtp1dq579','cmtpi68by0000p3ujczp68x6o','Bandar Abbas Distribution Center','distribution','Hormozgan',27.1832,56.2666,NOW());
INSERT INTO "Site" ("id","organizationId","name","type","region","lat","lng","createdAt") VALUES ('cmtpi68c8000wp3ujmvt0i1ox','cmtpi68by0000p3ujczp68x6o','Tehran Office','office','Tehran',35.7219,51.3347,NOW());
INSERT INTO "Product" ("id","organizationId","sku","name","category","unit","unitCost","unitPrice","leadTimeDays","abcClass","createdAt") VALUES ('cmtpi68ca0011p3ujlhvdzjtz','cmtpi68by0000p3ujczp68x6o','STEEL-COIL-01','Steel Coil HR 2mm','Raw Material','kg','0.92','1.40',21,'A',NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "Product" ("id","organizationId","sku","name","category","unit","unitCost","unitPrice","leadTimeDays","abcClass","createdAt") VALUES ('cmtpi68cb0013p3ujvqxez5mk','cmtpi68by0000p3ujczp68x6o','ALU-SHEET-02','Aluminum Sheet 1.5mm','Raw Material','kg','2.10','3.20',18,'A',NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "Product" ("id","organizationId","sku","name","category","unit","unitCost","unitPrice","leadTimeDays","abcClass","createdAt") VALUES ('cmtpi68cb0015p3uje8dhjyp3','cmtpi68by0000p3ujczp68x6o','COPPER-ROD-03','Copper Rod 8mm','Raw Material','kg','7.40','9.85',28,'A',NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "Product" ("id","organizationId","sku","name","category","unit","unitCost","unitPrice","leadTimeDays","abcClass","createdAt") VALUES ('cmtpi68cb0017p3ujq1zgzzqc','cmtpi68by0000p3ujczp68x6o','PLASTIC-PELLET-04','PE Pellet HD-50','Raw Material','kg','1.05','1.65',12,'B',NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "Product" ("id","organizationId","sku","name","category","unit","unitCost","unitPrice","leadTimeDays","abcClass","createdAt") VALUES ('cmtpi68cc0019p3ujrexfog8m','cmtpi68by0000p3ujczp68x6o','BEARING-6204','Bearing 6204-2RS','Component','pcs','4.20','7.10',35,'A',NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "Product" ("id","organizationId","sku","name","category","unit","unitCost","unitPrice","leadTimeDays","abcClass","createdAt") VALUES ('cmtpi68cc001bp3ujjgu6f362','cmtpi68by0000p3ujczp68x6o','MOTOR-1HP','Electric Motor 1HP','Component','pcs','88.00','142.00',42,'A',NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "Product" ("id","organizationId","sku","name","category","unit","unitCost","unitPrice","leadTimeDays","abcClass","createdAt") VALUES ('cmtpi68cd001dp3ujdoxkbm72','cmtpi68by0000p3ujczp68x6o','SENSOR-TEMP-K','Thermocouple Type-K','Component','pcs','12.50','21.00',14,'B',NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "Product" ("id","organizationId","sku","name","category","unit","unitCost","unitPrice","leadTimeDays","abcClass","createdAt") VALUES ('cmtpi68ce001fp3ujh751owi9','cmtpi68by0000p3ujczp68x6o','OIL-LUBE-20','Industrial Lube Oil 20L','Consumable','L','3.80','6.20',10,'B',NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "Product" ("id","organizationId","sku","name","category","unit","unitCost","unitPrice","leadTimeDays","abcClass","createdAt") VALUES ('cmtpi68ce001hp3ujkb0ads0v','cmtpi68by0000p3ujczp68x6o','PKG-CARTON-M','Carton Box Medium','Packaging','pcs','0.45','0.80',7,'C',NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "Product" ("id","organizationId","sku","name","category","unit","unitCost","unitPrice","leadTimeDays","abcClass","createdAt") VALUES ('cmtpi68cf001jp3uj6k4x0nbp','cmtpi68by0000p3ujczp68x6o','WIRE-CU-2.5','Copper Wire 2.5mm','Raw Material','m','0.30','0.55',9,'C',NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "Product" ("id","organizationId","sku","name","category","unit","unitCost","unitPrice","leadTimeDays","abcClass","createdAt") VALUES ('cmtpi68cf001lp3uj19cri0yn','cmtpi68by0000p3ujczp68x6o','CHEM-SOLVENT','Industrial Solvent 5L','Consumable','L','2.20','3.90',16,'C',NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "Product" ("id","organizationId","sku","name","category","unit","unitCost","unitPrice","leadTimeDays","abcClass","createdAt") VALUES ('cmtpi68cg001np3uj082uba34','cmtpi68by0000p3ujczp68x6o','GASKET-NBR','NBR Gasket Set','Component','set','6.80','11.50',24,'B',NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "Supplier" ("id","organizationId","name","country","rating","onTimeRate","avgLeadDays","defectRate","createdAt") VALUES ('cmtpi68ci001pp3uju7eu9qsn','cmtpi68by0000p3ujczp68x6o','Iran Alloy Co.','IR',0.82,0.78,21,0.025,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "Supplier" ("id","organizationId","name","country","rating","onTimeRate","avgLeadDays","defectRate","createdAt") VALUES ('cmtpi68ci001rp3ujiz59lnp5','cmtpi68by0000p3ujczp68x6o','Gulf Metals FZE','AE',0.9,0.92,14,0.01,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "Supplier" ("id","organizationId","name","country","rating","onTimeRate","avgLeadDays","defectRate","createdAt") VALUES ('cmtpi68cj001tp3uj6pw1lbmb','cmtpi68by0000p3ujczp68x6o','Anatolia Components','TR',0.75,0.7,28,0.04,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "Supplier" ("id","organizationId","name","country","rating","onTimeRate","avgLeadDays","defectRate","createdAt") VALUES ('cmtpi68ck001vp3ujszwvfsah','cmtpi68by0000p3ujczp68x6o','Asia Bearings Ltd','CN',0.88,0.85,35,0.015,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "Supplier" ("id","organizationId","name","country","rating","onTimeRate","avgLeadDays","defectRate","createdAt") VALUES ('cmtpi68cl001xp3ujs6minrvr','cmtpi68by0000p3ujczp68x6o','Petrochem North','IR',0.7,0.68,12,0.05,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "Supplier" ("id","organizationId","name","country","rating","onTimeRate","avgLeadDays","defectRate","createdAt") VALUES ('cmtpi68cl001zp3uj3xr4jjku','cmtpi68by0000p3ujczp68x6o','European Motor Works','DE',0.95,0.96,42,0.005,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "Warehouse" ("id","organizationId","siteId","name","capacity","createdAt") VALUES ('cmtpi68cn0021p3uj6r39gqck','cmtpi68by0000p3ujczp68x6o','cmtpi68c7000qp3ujrzayt26d','Tehran Factory Storage',80000,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "Warehouse" ("id","organizationId","siteId","name","capacity","createdAt") VALUES ('cmtpi68cn0023p3ujd64l1zc7','cmtpi68by0000p3ujczp68x6o','cmtpi68c7000sp3uj8f22dlk1','Qom Warehouse Storage',250000,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "Warehouse" ("id","organizationId","siteId","name","capacity","createdAt") VALUES ('cmtpi68co0025p3ujtyt7pf1j','cmtpi68by0000p3ujczp68x6o','cmtpi68c8000up3ujtp1dq579','Bandar Abbas Distribution Center Storage',400000,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "Warehouse" ("id","organizationId","siteId","name","capacity","createdAt") VALUES ('cmtpi68co0027p3uj3d2zmwod','cmtpi68by0000p3ujczp68x6o','cmtpi68c8000wp3ujmvt0i1ox','Tehran Office Storage',80000,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68cp0029p3ujvlt1t9s5','cmtpi68by0000p3ujczp68x6o','cmtpi68cn0021p3uj6r39gqck','cmtpi68ca0011p3ujlhvdzjtz',149,30,373,873,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68cp002bp3ujm5twgs5x','cmtpi68by0000p3ujczp68x6o','cmtpi68cn0023p3ujd64l1zc7','cmtpi68ca0011p3ujlhvdzjtz',1541,139,995,1205,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68cq002dp3ujobz9c1wr','cmtpi68by0000p3ujczp68x6o','cmtpi68co0025p3ujtyt7pf1j','cmtpi68ca0011p3ujlhvdzjtz',3341,450,1260,1716,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68cq002fp3ujulsnm72r','cmtpi68by0000p3ujczp68x6o','cmtpi68co0027p3uj3d2zmwod','cmtpi68ca0011p3ujlhvdzjtz',1025,93,365,589,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68cr002hp3ujxshmomto','cmtpi68by0000p3ujczp68x6o','cmtpi68cn0021p3uj6r39gqck','cmtpi68cb0013p3ujvqxez5mk',2125,130,891,1122,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68cr002jp3uj6nxon5j7','cmtpi68by0000p3ujczp68x6o','cmtpi68cn0023p3ujd64l1zc7','cmtpi68cb0013p3ujvqxez5mk',3457,590,972,1531,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68cs002lp3uj7kjhezu0','cmtpi68by0000p3ujczp68x6o','cmtpi68co0025p3ujtyt7pf1j','cmtpi68cb0013p3ujvqxez5mk',1102,80,1137,1369,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68cs002np3ujgjun3v8f','cmtpi68by0000p3ujczp68x6o','cmtpi68co0027p3uj3d2zmwod','cmtpi68cb0013p3ujvqxez5mk',943,64,206,374,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68ct002pp3ujr33hbxld','cmtpi68by0000p3ujczp68x6o','cmtpi68cn0021p3uj6r39gqck','cmtpi68cb0015p3uje8dhjyp3',2783,615,632,1217,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68cu002rp3uj9szzwzyb','cmtpi68by0000p3ujczp68x6o','cmtpi68cn0023p3ujd64l1zc7','cmtpi68cb0015p3uje8dhjyp3',1440,251,200,581,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68cu002tp3uj6jdq3t04','cmtpi68by0000p3ujczp68x6o','cmtpi68co0025p3ujtyt7pf1j','cmtpi68cb0015p3uje8dhjyp3',2009,253,618,1103,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68cv002vp3ujj5nu1nyv','cmtpi68by0000p3ujczp68x6o','cmtpi68co0027p3uj3d2zmwod','cmtpi68cb0015p3uje8dhjyp3',4935,629,1474,1860,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68cv002xp3uj01siqhag','cmtpi68by0000p3ujczp68x6o','cmtpi68cn0021p3uj6r39gqck','cmtpi68cb0017p3ujq1zgzzqc',1074,83,1212,1374,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68cw002zp3uj1ce9ll82','cmtpi68by0000p3ujczp68x6o','cmtpi68cn0023p3ujd64l1zc7','cmtpi68cb0017p3ujq1zgzzqc',2718,623,1145,1670,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68cw0031p3ujs68rvnqc','cmtpi68by0000p3ujczp68x6o','cmtpi68co0025p3ujtyt7pf1j','cmtpi68cb0017p3ujq1zgzzqc',2607,277,414,979,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68cx0033p3ujr6nc3iq5','cmtpi68by0000p3ujczp68x6o','cmtpi68co0027p3uj3d2zmwod','cmtpi68cb0017p3ujq1zgzzqc',698,100,904,1010,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68cy0035p3ujzvwg4iog','cmtpi68by0000p3ujczp68x6o','cmtpi68cn0021p3uj6r39gqck','cmtpi68cc0019p3ujrexfog8m',4297,539,1340,1838,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68cy0037p3uj1o22errr','cmtpi68by0000p3ujczp68x6o','cmtpi68cn0023p3ujd64l1zc7','cmtpi68cc0019p3ujrexfog8m',401,37,802,1011,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68cz0039p3ujrg6ioe53','cmtpi68by0000p3ujczp68x6o','cmtpi68co0025p3ujtyt7pf1j','cmtpi68cc0019p3ujrexfog8m',3195,770,957,1081,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68d0003bp3ujsdruk6g8','cmtpi68by0000p3ujczp68x6o','cmtpi68co0027p3uj3d2zmwod','cmtpi68cc0019p3ujrexfog8m',1899,188,394,987,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68d1003dp3ujnw1ppsjh','cmtpi68by0000p3ujczp68x6o','cmtpi68cn0021p3uj6r39gqck','cmtpi68cc001bp3ujjgu6f362',913,91,1114,1372,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68d1003fp3uj5r61gjou','cmtpi68by0000p3ujczp68x6o','cmtpi68cn0023p3ujd64l1zc7','cmtpi68cc001bp3ujjgu6f362',2764,315,782,1061,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68d1003hp3ujnwfxepjx','cmtpi68by0000p3ujczp68x6o','cmtpi68co0025p3ujtyt7pf1j','cmtpi68cc001bp3ujjgu6f362',4248,401,1339,1817,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68d2003jp3ujbtjvg36v','cmtpi68by0000p3ujczp68x6o','cmtpi68co0027p3uj3d2zmwod','cmtpi68cc001bp3ujjgu6f362',4988,362,1234,1756,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68d3003lp3ujko3ihn74','cmtpi68by0000p3ujczp68x6o','cmtpi68cn0021p3uj6r39gqck','cmtpi68cd001dp3ujdoxkbm72',523,30,321,916,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68d3003np3uje1zwef1s','cmtpi68by0000p3ujczp68x6o','cmtpi68cn0023p3ujd64l1zc7','cmtpi68cd001dp3ujdoxkbm72',947,221,1458,1833,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68d4003pp3ujost8nn6u','cmtpi68by0000p3ujczp68x6o','cmtpi68co0025p3ujtyt7pf1j','cmtpi68cd001dp3ujdoxkbm72',1213,193,218,625,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68d5003rp3ujjkoa9vie','cmtpi68by0000p3ujczp68x6o','cmtpi68co0027p3uj3d2zmwod','cmtpi68cd001dp3ujdoxkbm72',1290,180,410,762,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68d5003tp3ujwrl19ngj','cmtpi68by0000p3ujczp68x6o','cmtpi68cn0021p3uj6r39gqck','cmtpi68ce001fp3ujh751owi9',1035,223,995,1530,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68d6003vp3ujdnlo5t7x','cmtpi68by0000p3ujczp68x6o','cmtpi68cn0023p3ujd64l1zc7','cmtpi68ce001fp3ujh751owi9',1778,204,920,1212,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68d7003xp3ujgjjdrail','cmtpi68by0000p3ujczp68x6o','cmtpi68co0025p3ujtyt7pf1j','cmtpi68ce001fp3ujh751owi9',4189,228,1018,1610,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68d8003zp3ujo4hp1f0p','cmtpi68by0000p3ujczp68x6o','cmtpi68co0027p3uj3d2zmwod','cmtpi68ce001fp3ujh751owi9',4149,796,1483,1867,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68d80041p3uj31nszgaw','cmtpi68by0000p3ujczp68x6o','cmtpi68cn0021p3uj6r39gqck','cmtpi68ce001hp3ujkb0ads0v',2028,199,733,885,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68d90043p3ujgv76fpcs','cmtpi68by0000p3ujczp68x6o','cmtpi68cn0023p3ujd64l1zc7','cmtpi68ce001hp3ujkb0ads0v',1582,301,651,1069,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68db0045p3uj9calp84h','cmtpi68by0000p3ujczp68x6o','cmtpi68co0025p3ujtyt7pf1j','cmtpi68ce001hp3ujkb0ads0v',11328,1702,1290,1888,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68dc0047p3ujd5zvs9a7','cmtpi68by0000p3ujczp68x6o','cmtpi68co0027p3uj3d2zmwod','cmtpi68ce001hp3ujkb0ads0v',579,135,219,444,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68dc0049p3ujb7vw3c2j','cmtpi68by0000p3ujczp68x6o','cmtpi68cn0021p3uj6r39gqck','cmtpi68cf001jp3uj6k4x0nbp',2664,228,782,1282,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68dd004bp3ujzh3puzs4','cmtpi68by0000p3ujczp68x6o','cmtpi68cn0023p3ujd64l1zc7','cmtpi68cf001jp3uj6k4x0nbp',3512,351,1410,1736,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68de004dp3ujybsvnirl','cmtpi68by0000p3ujczp68x6o','cmtpi68co0025p3ujtyt7pf1j','cmtpi68cf001jp3uj6k4x0nbp',797,85,339,603,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68de004fp3uj8ud2hkf7','cmtpi68by0000p3ujczp68x6o','cmtpi68co0027p3uj3d2zmwod','cmtpi68cf001jp3uj6k4x0nbp',1133,210,1294,1754,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68df004hp3uj33zkwvhj','cmtpi68by0000p3ujczp68x6o','cmtpi68cn0021p3uj6r39gqck','cmtpi68cf001lp3uj19cri0yn',1618,246,1292,1495,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68dg004jp3ujq45375jl','cmtpi68by0000p3ujczp68x6o','cmtpi68cn0023p3ujd64l1zc7','cmtpi68cf001lp3uj19cri0yn',5285,371,920,1057,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68dg004lp3ujn1yk17wv','cmtpi68by0000p3ujczp68x6o','cmtpi68co0025p3ujtyt7pf1j','cmtpi68cf001lp3uj19cri0yn',371,39,384,907,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68dh004np3ujc41f8j14','cmtpi68by0000p3ujczp68x6o','cmtpi68co0027p3uj3d2zmwod','cmtpi68cf001lp3uj19cri0yn',2338,577,1051,1479,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68dh004pp3ujsn30ecyd','cmtpi68by0000p3ujczp68x6o','cmtpi68cn0021p3uj6r39gqck','cmtpi68cg001np3uj082uba34',2938,200,852,1096,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68dh004rp3ujowtgoy5n','cmtpi68by0000p3ujczp68x6o','cmtpi68cn0023p3ujd64l1zc7','cmtpi68cg001np3uj082uba34',510,68,634,1208,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68di004tp3ujij0qk270','cmtpi68by0000p3ujczp68x6o','cmtpi68co0025p3ujtyt7pf1j','cmtpi68cg001np3uj082uba34',3162,549,631,1074,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "InventoryItem" ("id","organizationId","warehouseId","productId","onHand","reserved","safetyStock","reorderPoint","updatedAt") VALUES ('cmtpi68di004vp3uj4vcvz2w0','cmtpi68by0000p3ujczp68x6o','cmtpi68co0027p3uj3d2zmwod','cmtpi68cg001np3uj082uba34',1968,343,750,1049,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "Shipment" ("id","organizationId","reference","supplierId","originName","originLat","originLng","destName","destLat","destLng","carrier","status","eta","dispatchedAt","deliveredAt","distanceKm","progress","delayMinutes","createdAt","updatedAt") VALUES ('cmtpi68dk004xp3ujar4vqtx2','cmtpi68by0000p3ujczp68x6o','SHP-1000','cmtpi68cl001xp3ujs6minrvr','Asia Bearings, Shanghai',31.2304,121.4737,'Tehran Factory',35.6892,51.389,'Rail Cargo','DISPATCHED','2026-09-12T06:45:44.868Z','2026-09-07T07:41:16.105Z',NULL,3051,0.1319395621033796,0,'2026-09-06T07:41:16.105Z','2026-09-06T07:41:16.136Z') ON CONFLICT DO NOTHING;
INSERT INTO "Shipment" ("id","organizationId","reference","supplierId","originName","originLat","originLng","destName","destLat","destLng","carrier","status","eta","dispatchedAt","deliveredAt","distanceKm","progress","delayMinutes","createdAt","updatedAt") VALUES ('cmtpi68ew0059p3uj9rp8kruf','cmtpi68by0000p3ujczp68x6o','SHP-1001','cmtpi68cj001tp3uj6pw1lbmb','Gulf Metals FZE, Jebel Ali',25.0097,55.0737,'Qom Warehouse',34.6401,50.8764,'Rail Cargo','DISPATCHED','2026-09-09T16:11:02.121Z','2026-09-03T07:41:16.105Z',NULL,3721,0.235255975624768,0,'2026-09-02T07:41:16.105Z','2026-09-06T07:41:16.184Z') ON CONFLICT DO NOTHING;
INSERT INTO "Shipment" ("id","organizationId","reference","supplierId","originName","originLat","originLng","destName","destLat","destLng","carrier","status","eta","dispatchedAt","deliveredAt","distanceKm","progress","delayMinutes","createdAt","updatedAt") VALUES ('cmtpi68f2005np3uj07ljxp09','cmtpi68by0000p3ujczp68x6o','SHP-1002','cmtpi68cl001xp3ujs6minrvr','European Motor Works, Munich',48.1351,11.582,'Tehran Factory',35.6892,51.389,'Internal Fleet','IN_TRANSIT','2026-09-09T02:31:12.619Z','2026-09-04T07:41:16.105Z',NULL,6534,0.6258046478793968,0,'2026-09-03T07:41:16.105Z','2026-09-06T07:41:16.190Z') ON CONFLICT DO NOTHING;
INSERT INTO "Shipment" ("id","organizationId","reference","supplierId","originName","originLat","originLng","destName","destLat","destLng","carrier","status","eta","dispatchedAt","deliveredAt","distanceKm","progress","delayMinutes","createdAt","updatedAt") VALUES ('cmtpi68fb005zp3uj90ve1zf0','cmtpi68by0000p3ujczp68x6o','SHP-1003','cmtpi68cj001tp3uj6pw1lbmb','Gulf Metals FZE, Jebel Ali',25.0097,55.0737,'Qom Warehouse',34.6401,50.8764,'Rail Cargo','DISPATCHED','2026-09-11T20:46:45.494Z','2026-08-31T07:41:16.105Z',NULL,1571,0.2677394729279285,0,'2026-08-30T07:41:16.105Z','2026-09-06T07:41:16.199Z') ON CONFLICT DO NOTHING;
INSERT INTO "Shipment" ("id","organizationId","reference","supplierId","originName","originLat","originLng","destName","destLat","destLng","carrier","status","eta","dispatchedAt","deliveredAt","distanceKm","progress","delayMinutes","createdAt","updatedAt") VALUES ('cmtpi68fe0067p3ujeqj0f52b','cmtpi68by0000p3ujczp68x6o','SHP-1004','cmtpi68cl001zp3uj3xr4jjku','Anatolia, Istanbul',41.0082,28.9784,'Qom Warehouse',34.6401,50.8764,'Maersk Logistics','DELIVERED','2026-09-08T06:44:20.500Z','2026-08-31T07:41:16.105Z','2026-09-04T19:06:31.705Z',4304,1,0,'2026-08-30T07:41:16.105Z','2026-09-06T07:41:16.202Z') ON CONFLICT DO NOTHING;
INSERT INTO "Shipment" ("id","organizationId","reference","supplierId","originName","originLat","originLng","destName","destLat","destLng","carrier","status","eta","dispatchedAt","deliveredAt","distanceKm","progress","delayMinutes","createdAt","updatedAt") VALUES ('cmtpi68fj006hp3ujmxuppwpy','cmtpi68by0000p3ujczp68x6o','SHP-1005','cmtpi68cl001xp3ujs6minrvr','Asia Bearings, Shanghai',31.2304,121.4737,'Bandar Abbas DC',27.1832,56.2666,'DHL Industrial','IN_TRANSIT','2026-09-12T03:58:58.412Z','2026-09-01T07:41:16.105Z',NULL,5681,0.6191669804983628,0,'2026-08-31T07:41:16.105Z','2026-09-06T07:41:16.207Z') ON CONFLICT DO NOTHING;
INSERT INTO "Shipment" ("id","organizationId","reference","supplierId","originName","originLat","originLng","destName","destLat","destLng","carrier","status","eta","dispatchedAt","deliveredAt","distanceKm","progress","delayMinutes","createdAt","updatedAt") VALUES ('cmtpi68ft006tp3ujtdco83re','cmtpi68by0000p3ujczp68x6o','SHP-1006','cmtpi68cl001xp3ujs6minrvr','Gulf Metals FZE, Jebel Ali',25.0097,55.0737,'Qom Warehouse',34.6401,50.8764,'DHL Industrial','DELAYED','2026-09-09T10:42:58.758Z','2026-09-04T07:41:16.105Z',NULL,4400,0.4228921104756364,2231,'2026-09-03T07:41:16.105Z','2026-09-06T07:41:16.217Z') ON CONFLICT DO NOTHING;
INSERT INTO "Shipment" ("id","organizationId","reference","supplierId","originName","originLat","originLng","destName","destLat","destLng","carrier","status","eta","dispatchedAt","deliveredAt","distanceKm","progress","delayMinutes","createdAt","updatedAt") VALUES ('cmtpi68g30075p3ujtox6by81','cmtpi68by0000p3ujczp68x6o','SHP-1007','cmtpi68ci001rp3ujiz59lnp5','Anatolia, Istanbul',41.0082,28.9784,'Qom Warehouse',34.6401,50.8764,'Maersk Logistics','IN_TRANSIT','2026-09-11T08:08:07.641Z','2026-08-31T07:41:16.105Z',NULL,7239,0.5581549785887181,0,'2026-08-30T07:41:16.105Z','2026-09-06T07:41:16.228Z') ON CONFLICT DO NOTHING;
INSERT INTO "Shipment" ("id","organizationId","reference","supplierId","originName","originLat","originLng","destName","destLat","destLng","carrier","status","eta","dispatchedAt","deliveredAt","distanceKm","progress","delayMinutes","createdAt","updatedAt") VALUES ('cmtpi68g8007hp3ujoqhov3l3','cmtpi68by0000p3ujczp68x6o','SHP-1008','cmtpi68ci001rp3ujiz59lnp5','Anatolia, Istanbul',41.0082,28.9784,'Qom Warehouse',34.6401,50.8764,'DHL Industrial','DELIVERED','2026-09-10T04:31:53.168Z','2026-09-06T07:41:16.105Z','2026-09-03T19:27:47.991Z',3429,1,0,'2026-09-05T07:41:16.105Z','2026-09-06T07:41:16.232Z') ON CONFLICT DO NOTHING;
INSERT INTO "Shipment" ("id","organizationId","reference","supplierId","originName","originLat","originLng","destName","destLat","destLng","carrier","status","eta","dispatchedAt","deliveredAt","distanceKm","progress","delayMinutes","createdAt","updatedAt") VALUES ('cmtpi68gb007rp3ujbg8s3u9c','cmtpi68by0000p3ujczp68x6o','SHP-1009','cmtpi68cj001tp3uj6pw1lbmb','Asia Bearings, Shanghai',31.2304,121.4737,'Qom Warehouse',34.6401,50.8764,'DHL Industrial','PLANNED','2026-09-07T18:34:21.180Z',NULL,NULL,2779,0,0,'2026-09-01T07:41:16.105Z','2026-09-06T07:41:16.235Z') ON CONFLICT DO NOTHING;
INSERT INTO "Shipment" ("id","organizationId","reference","supplierId","originName","originLat","originLng","destName","destLat","destLng","carrier","status","eta","dispatchedAt","deliveredAt","distanceKm","progress","delayMinutes","createdAt","updatedAt") VALUES ('cmtpi68gd007vp3ujko09u2f4','cmtpi68by0000p3ujczp68x6o','SHP-1010','cmtpi68cj001tp3uj6pw1lbmb','Asia Bearings, Shanghai',31.2304,121.4737,'Qom Warehouse',34.6401,50.8764,'Rail Cargo','DELIVERED','2026-09-10T11:19:32.666Z','2026-09-03T07:41:16.105Z','2026-09-01T09:12:14.160Z',6790,1,0,'2026-09-02T07:41:16.105Z','2026-09-06T07:41:16.237Z') ON CONFLICT DO NOTHING;
INSERT INTO "Shipment" ("id","organizationId","reference","supplierId","originName","originLat","originLng","destName","destLat","destLng","carrier","status","eta","dispatchedAt","deliveredAt","distanceKm","progress","delayMinutes","createdAt","updatedAt") VALUES ('cmtpi68gq0089p3ujn2rdjs7d','cmtpi68by0000p3ujczp68x6o','SHP-1011','cmtpi68ci001rp3ujiz59lnp5','Gulf Metals FZE, Jebel Ali',25.0097,55.0737,'Bandar Abbas DC',27.1832,56.2666,'Internal Fleet','DISPATCHED','2026-09-07T20:46:53.371Z','2026-09-01T07:41:16.105Z',NULL,6786,0.2410129149750674,0,'2026-08-31T07:41:16.105Z','2026-09-06T07:41:16.250Z') ON CONFLICT DO NOTHING;
INSERT INTO "Shipment" ("id","organizationId","reference","supplierId","originName","originLat","originLng","destName","destLat","destLng","carrier","status","eta","dispatchedAt","deliveredAt","distanceKm","progress","delayMinutes","createdAt","updatedAt") VALUES ('cmtpi68gt008np3uj5e2c3nxw','cmtpi68by0000p3ujczp68x6o','SHP-1012','cmtpi68ck001vp3ujszwvfsah','European Motor Works, Munich',48.1351,11.582,'Tehran Factory',35.6892,51.389,'DHL Industrial','DELIVERED','2026-09-12T07:22:56.174Z','2026-09-04T07:41:16.105Z','2026-09-03T16:06:42.662Z',5778,1,0,'2026-09-03T07:41:16.105Z','2026-09-06T07:41:16.253Z') ON CONFLICT DO NOTHING;
INSERT INTO "Shipment" ("id","organizationId","reference","supplierId","originName","originLat","originLng","destName","destLat","destLng","carrier","status","eta","dispatchedAt","deliveredAt","distanceKm","progress","delayMinutes","createdAt","updatedAt") VALUES ('cmtpi68gv008zp3uj2d5sqa9z','cmtpi68by0000p3ujczp68x6o','SHP-1013','cmtpi68cl001zp3uj3xr4jjku','Asia Bearings, Shanghai',31.2304,121.4737,'Qom Warehouse',34.6401,50.8764,'Maersk Logistics','DELIVERED','2026-09-12T03:29:55.272Z','2026-09-05T07:41:16.105Z','2026-09-04T12:56:32.490Z',2310,1,0,'2026-09-04T07:41:16.105Z','2026-09-06T07:41:16.255Z') ON CONFLICT DO NOTHING;
INSERT INTO "Alert" ("id","organizationId","severity","category","title","message","impact","recommendation","source","confidence","status","createdAt","updatedAt") VALUES ('cmtpi68gx0097p3ujao6urbwq','cmtpi68by0000p3ujczp68x6o','CRITICAL','inventory','Steel Coil HR 2mm may stock out in 3 days','Tehran Factory on-hand below safety stock with active production consumption.','Production interruption risk on Line A & B.','Increase PO quantity by 12,000 kg; Gulf Metals FZE can deliver in 14 days.','inventory-engine',0.91,'open','2026-09-05T22:47:18.868Z','2026-09-06T07:41:16.257Z') ON CONFLICT DO NOTHING;
INSERT INTO "Alert" ("id","organizationId","severity","category","title","message","impact","recommendation","source","confidence","status","createdAt","updatedAt") VALUES ('cmtpi68gx0099p3ujya7lwihg','cmtpi68by0000p3ujczp68x6o','HIGH','logistics','Shipment SHP-1006 delayed at customs','Asia Bearings shipment 6 days in transit; ETA slipped by 28h.','Bearing stockout risk within 5 days if not resolved.','Escalate with carrier; expedite customs clearance.','logistics-engine',0.84,'open','2026-09-05T12:20:39.396Z','2026-09-06T07:41:16.258Z') ON CONFLICT DO NOTHING;
INSERT INTO "Alert" ("id","organizationId","severity","category","title","message","impact","recommendation","source","confidence","status","createdAt","updatedAt") VALUES ('cmtpi68gy009bp3ujoi12c6rr','cmtpi68by0000p3ujczp68x6o','HIGH','supplier','Petrochem North on-time rate dropped to 68%','Last 4 PE Pellet deliveries late by avg 2.3 days.','Packaging line contingency usage rising.','Dual-source PE Pellet via Iran Alloy Co. pilot.','supplier-engine',0.78,'open','2026-09-06T00:18:53.312Z','2026-09-06T07:41:16.258Z') ON CONFLICT DO NOTHING;
INSERT INTO "Alert" ("id","organizationId","severity","category","title","message","impact","recommendation","source","confidence","status","createdAt","updatedAt") VALUES ('cmtpi68gz009dp3ujdly3g0hx','cmtpi68by0000p3ujczp68x6o','HIGH','inventory','Carton Box overstock at Bandar Abbas DC','On-hand 4.8x reorder point; 92-day coverage.','Working capital tied: ~$18,400.','Pause next 2 carton POs; reallocate to Qom.','inventory-engine',0.88,'open','2026-09-05T13:58:36.360Z','2026-09-06T07:41:16.259Z') ON CONFLICT DO NOTHING;
INSERT INTO "Alert" ("id","organizationId","severity","category","title","message","impact","recommendation","source","confidence","status","createdAt","updatedAt") VALUES ('cmtpi68gz009fp3uj3sthsfe5','cmtpi68by0000p3ujczp68x6o','MEDIUM','logistics','European Motor Works lead time +14% vs 90d avg','Avg 48d vs baseline 42d across last 6 POs.','Motor availability planning buffer reduced.','Increase safety stock from 120 to 160 pcs.','lead-time-engine',0.72,'open','2026-09-05T22:12:32.911Z','2026-09-06T07:41:16.260Z') ON CONFLICT DO NOTHING;
INSERT INTO "Alert" ("id","organizationId","severity","category","title","message","impact","recommendation","source","confidence","status","createdAt","updatedAt") VALUES ('cmtpi68h0009hp3uj4tjfu535','cmtpi68by0000p3ujczp68x6o','MEDIUM','inventory','Industrial Solvent slow-moving at Qom','Last 2 months consumption 22% of plan.','Storage capacity pressure; expiry risk.','Discount reallocate or reduce next PO 60%.','inventory-engine',0.69,'open','2026-09-05T20:40:29.609Z','2026-09-06T07:41:16.260Z') ON CONFLICT DO NOTHING;
INSERT INTO "Alert" ("id","organizationId","severity","category","title","message","impact","recommendation","source","confidence","status","createdAt","updatedAt") VALUES ('cmtpi68h0009jp3ujp6jej6g6','cmtpi68by0000p3ujczp68x6o','LOW','supplier','Anatolia Components defect rate above threshold','Defect rate 4.0% vs target 2.0%.','QC rejection cost trending up.','Trigger supplier review; sample audit next lot.','supplier-engine',0.66,'open','2026-09-05T22:45:52.048Z','2026-09-06T07:41:16.261Z') ON CONFLICT DO NOTHING;
INSERT INTO "Alert" ("id","organizationId","severity","category","title","message","impact","recommendation","source","confidence","status","createdAt","updatedAt") VALUES ('cmtpi68h1009lp3ujcvu4rtkw','cmtpi68by0000p3ujczp68x6o','LOW','supplier','Carton price list updated','Routine threshold reminder.','Minimal.','Monitor.','system',0.5580951807391605,'open','2026-09-05T16:35:48.838Z','2026-09-06T07:41:16.261Z') ON CONFLICT DO NOTHING;
INSERT INTO "Alert" ("id","organizationId","severity","category","title","message","impact","recommendation","source","confidence","status","createdAt","updatedAt") VALUES ('cmtpi68h1009np3ujvx8k30gr','cmtpi68by0000p3ujczp68x6o','INFO','logistics','Sensor drift on Line A thermocouple','Automated check flagged minor variance.','Minimal.','Monitor.','system',0.5320424608963557,'open','2026-09-04T21:54:47.208Z','2026-09-06T07:41:16.262Z') ON CONFLICT DO NOTHING;
INSERT INTO "Alert" ("id","organizationId","severity","category","title","message","impact","recommendation","source","confidence","status","createdAt","updatedAt") VALUES ('cmtpi68h2009pp3ujanarnobu','cmtpi68by0000p3ujczp68x6o','LOW','system','Motor supplier invoice reconciled','Informational event logged.','Minimal.','Monitor.','system',0.6538872580007794,'open','2026-09-04T20:37:40.550Z','2026-09-06T07:41:16.262Z') ON CONFLICT DO NOTHING;
INSERT INTO "Alert" ("id","organizationId","severity","category","title","message","impact","recommendation","source","confidence","status","createdAt","updatedAt") VALUES ('cmtpi68h2009rp3uj9o10rccq','cmtpi68by0000p3ujczp68x6o','LOW','supplier','Carton price list updated','Automated check flagged minor variance.','Minimal.','Monitor.','system',0.7810175560486087,'open','2026-09-05T17:53:09.660Z','2026-09-06T07:41:16.263Z') ON CONFLICT DO NOTHING;
INSERT INTO "Alert" ("id","organizationId","severity","category","title","message","impact","recommendation","source","confidence","status","createdAt","updatedAt") VALUES ('cmtpi68h3009tp3ujid1c29hk','cmtpi68by0000p3ujczp68x6o','MEDIUM','inventory','Sensor drift on Line A thermocouple','Routine threshold reminder.','Minimal.','Monitor.','system',0.5632931734704709,'open','2026-09-05T16:18:23.992Z','2026-09-06T07:41:16.263Z') ON CONFLICT DO NOTHING;
INSERT INTO "Alert" ("id","organizationId","severity","category","title","message","impact","recommendation","source","confidence","status","createdAt","updatedAt") VALUES ('cmtpi68h3009vp3uj9gn5n6e9','cmtpi68by0000p3ujczp68x6o','INFO','logistics','Motor supplier invoice reconciled','No action required.','Minimal.','Monitor.','system',0.6400911381396769,'open','2026-09-05T03:49:07.148Z','2026-09-06T07:41:16.264Z') ON CONFLICT DO NOTHING;
INSERT INTO "Alert" ("id","organizationId","severity","category","title","message","impact","recommendation","source","confidence","status","createdAt","updatedAt") VALUES ('cmtpi68h4009xp3ujjz4gmhd4','cmtpi68by0000p3ujczp68x6o','INFO','system','Motor supplier invoice reconciled','No action required.','Minimal.','Monitor.','system',0.627958079542981,'open','2026-09-04T20:56:18.494Z','2026-09-06T07:41:16.265Z') ON CONFLICT DO NOTHING;
INSERT INTO "Alert" ("id","organizationId","severity","category","title","message","impact","recommendation","source","confidence","status","createdAt","updatedAt") VALUES ('cmtpi68h5009zp3uj3wp2v9h7','cmtpi68by0000p3ujczp68x6o','INFO','logistics','Motor supplier invoice reconciled','Automated check flagged minor variance.','Minimal.','Monitor.','system',0.6644222842078154,'open','2026-09-05T17:01:34.789Z','2026-09-06T07:41:16.265Z') ON CONFLICT DO NOTHING;
INSERT INTO "Alert" ("id","organizationId","severity","category","title","message","impact","recommendation","source","confidence","status","createdAt","updatedAt") VALUES ('cmtpi68h500a1p3ujigz8iwjx','cmtpi68by0000p3ujczp68x6o','LOW','inventory','Daily sync completed','Informational event logged.','Minimal.','Monitor.','system',0.5574550882501231,'open','2026-09-04T18:47:49.699Z','2026-09-06T07:41:16.266Z') ON CONFLICT DO NOTHING;
INSERT INTO "Risk" ("id","organizationId","dimension","title","severity","probability","impact","confidence","score","source","recommendation","createdAt","updatedAt") VALUES ('cmtpi68h600a3p3ujrfgrh0fi','cmtpi68by0000p3ujczp68x6o','inventory','Raw material stockout — Steel Coil','CRITICAL',0.85,0.9,0.9,0.765,'risk-engine','Issue PO +12,000 kg within 24h.','2026-09-06T07:41:16.266Z','2026-09-06T07:41:16.266Z') ON CONFLICT DO NOTHING;
INSERT INTO "Risk" ("id","organizationId","dimension","title","severity","probability","impact","confidence","score","source","recommendation","createdAt","updatedAt") VALUES ('cmtpi68h600a5p3ujty64b894','cmtpi68by0000p3ujczp68x6o','shipment','Inbound shipment delay — Asia Bearings','HIGH',0.78,0.72,0.82,0.5616,'risk-engine','Expedite customs; activate backup supplier.','2026-09-06T07:41:16.267Z','2026-09-06T07:41:16.267Z') ON CONFLICT DO NOTHING;
INSERT INTO "Risk" ("id","organizationId","dimension","title","severity","probability","impact","confidence","score","source","recommendation","createdAt","updatedAt") VALUES ('cmtpi68h700a7p3ujxqim94fe','cmtpi68by0000p3ujczp68x6o','supplier','Supplier reliability — Petrochem North','HIGH',0.7,0.6,0.75,0.42,'risk-engine','Dual-source PE Pellet.','2026-09-06T07:41:16.268Z','2026-09-06T07:41:16.268Z') ON CONFLICT DO NOTHING;
INSERT INTO "Risk" ("id","organizationId","dimension","title","severity","probability","impact","confidence","score","source","recommendation","createdAt","updatedAt") VALUES ('cmtpi68h800a9p3uj634j8d7k','cmtpi68by0000p3ujczp68x6o','inventory','Overstock capital lock — Packaging','MEDIUM',0.92,0.45,0.86,0.414,'risk-engine','Pause next 2 carton POs.','2026-09-06T07:41:16.268Z','2026-09-06T07:41:16.268Z') ON CONFLICT DO NOTHING;
INSERT INTO "Risk" ("id","organizationId","dimension","title","severity","probability","impact","confidence","score","source","recommendation","createdAt","updatedAt") VALUES ('cmtpi68h800abp3uj5ipultag','cmtpi68by0000p3ujczp68x6o','lead_time','Lead time drift — European Motor Works','MEDIUM',0.66,0.55,0.72,0.363,'risk-engine','Raise safety stock to 160 pcs.','2026-09-06T07:41:16.269Z','2026-09-06T07:41:16.269Z') ON CONFLICT DO NOTHING;
INSERT INTO "Risk" ("id","organizationId","dimension","title","severity","probability","impact","confidence","score","source","recommendation","createdAt","updatedAt") VALUES ('cmtpi68h900adp3ujfmgday0q','cmtpi68by0000p3ujczp68x6o','demand','Demand spike — Aluminum Sheet','MEDIUM',0.6,0.6,0.62,0.36,'risk-engine','Confirm forecast; pre-position Qom stock.','2026-09-06T07:41:16.269Z','2026-09-06T07:41:16.269Z') ON CONFLICT DO NOTHING;
INSERT INTO "Recommendation" ("id","organizationId","title","summary","rationale","action","autonomyLevel","status","impact","confidence","createdAt") VALUES ('cmtpi68h900afp3ujc15vwfpw','cmtpi68by0000p3ujczp68x6o','Prepare Purchase Order — Steel Coil HR 2mm','12,000 kg from Gulf Metals FZE to restore safety buffer.','Stockout risk in 3 days; supplier on-time 92%.','create_purchase_order',2,'pending','Prevents Line A/B stoppage; est. saved cost $42,000.',0.9,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "Recommendation" ("id","organizationId","title","summary","rationale","action","autonomyLevel","status","impact","confidence","createdAt") VALUES ('cmtpi68ha00ahp3ujbs6monym','cmtpi68by0000p3ujczp68x6o','Expedite Customs — Shipment SHP-1006','Escalate with carrier; target clearance within 24h.','Bearing stockout risk within 5 days.','escalate_shipment',1,'pending','Avoids 5-day production buffer loss.',0.82,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "Recommendation" ("id","organizationId","title","summary","rationale","action","autonomyLevel","status","impact","confidence","createdAt") VALUES ('cmtpi68ha00ajp3ujav1xgk8k','cmtpi68by0000p3ujczp68x6o','Pause Next 2 Carton POs — Bandar Abbas','Defer reorder until on-hand < 2x reorder point.','Overstock 4.8x; $18.4k capital locked.','pause_purchase_order',1,'pending','Frees ~$18,400 working capital.',0.86,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "Recommendation" ("id","organizationId","title","summary","rationale","action","autonomyLevel","status","impact","confidence","createdAt") VALUES ('cmtpi68hb00alp3ujbh5ekwyv','cmtpi68by0000p3ujczp68x6o','Raise Safety Stock — Electric Motor 1HP','Adjust from 120 to 160 pcs.','Lead time drift +14% on primary supplier.','update_safety_stock',0,'pending','Improves availability buffer by 4 weeks.',0.72,NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "OrganizationMember" ("id","organizationId","userId","role","createdAt") VALUES ('cmtpi68bz0002p3ujsjnfy06g','cmtpi68by0000p3ujczp68x6o','u_platform_admin','Platform Admin',NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "OrganizationMember" ("id","organizationId","userId","role","createdAt") VALUES ('cmtpi68c00004p3uj4jhy3mfw','cmtpi68by0000p3ujczp68x6o','u_organization_owner','Organization Owner',NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "OrganizationMember" ("id","organizationId","userId","role","createdAt") VALUES ('cmtpi68c00006p3uj2eon7h0m','cmtpi68by0000p3ujczp68x6o','u_executive','Executive',NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "OrganizationMember" ("id","organizationId","userId","role","createdAt") VALUES ('cmtpi68c10008p3ujwuot23v5','cmtpi68by0000p3ujczp68x6o','u_operations_manager','Operations Manager',NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "OrganizationMember" ("id","organizationId","userId","role","createdAt") VALUES ('cmtpi68c1000ap3ujv832o8qt','cmtpi68by0000p3ujczp68x6o','u_supply_chain_manager','Supply Chain Manager',NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "OrganizationMember" ("id","organizationId","userId","role","createdAt") VALUES ('cmtpi68c1000cp3ujqbtaa6ja','cmtpi68by0000p3ujczp68x6o','u_logistics_manager','Logistics Manager',NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "OrganizationMember" ("id","organizationId","userId","role","createdAt") VALUES ('cmtpi68c4000ep3ujos2egd4u','cmtpi68by0000p3ujczp68x6o','u_warehouse_manager','Warehouse Manager',NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "OrganizationMember" ("id","organizationId","userId","role","createdAt") VALUES ('cmtpi68c4000gp3ujl1yfbg3y','cmtpi68by0000p3ujczp68x6o','u_procurement_manager','Procurement Manager',NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "OrganizationMember" ("id","organizationId","userId","role","createdAt") VALUES ('cmtpi68c5000ip3uj4s095wst','cmtpi68by0000p3ujczp68x6o','u_factory_manager','Factory Manager',NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "OrganizationMember" ("id","organizationId","userId","role","createdAt") VALUES ('cmtpi68c5000kp3ujdtipks2h','cmtpi68by0000p3ujczp68x6o','u_finance_manager','Finance Manager',NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "OrganizationMember" ("id","organizationId","userId","role","createdAt") VALUES ('cmtpi68c6000mp3ujqezn9da0','cmtpi68by0000p3ujczp68x6o','u_analyst','Analyst',NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "OrganizationMember" ("id","organizationId","userId","role","createdAt") VALUES ('cmtpi68c6000op3ujo3ddm0ed','cmtpi68by0000p3ujczp68x6o','u_viewer','Viewer',NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "Facility" ("id","siteId","name","type","createdAt") VALUES ('cmtpi68c9000xp3ujdah03npd','cmtpi68c7000qp3ujrzayt26d','Tehran Factory — Line A','production',NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "Facility" ("id","siteId","name","type","createdAt") VALUES ('cmtpi68c9000yp3ujoy74chje','cmtpi68c7000qp3ujrzayt26d','Tehran Factory — Line B','production',NOW()) ON CONFLICT DO NOTHING;
INSERT INTO "Facility" ("id","siteId","name","type","createdAt") VALUES ('cmtpi68c9000zp3uja3zqwdnr','cmtpi68c7000qp3ujrzayt26d','Tehran Factory — Staging','staging',NOW()) ON CONFLICT DO NOTHING;
-- IndustryScope — Seed plans (idempotent: safe to run multiple times)
DELETE FROM "Plan";
INSERT INTO "Plan" ("id","code","name","description","priceMonthly","priceYearly","maxUsers","maxSites","features","active","createdAt","updatedAt") VALUES (gen_random_uuid(),'starter','Starter','Inventory + Logistics + Command Center',2900000,29000000,5,3,'["Multi-site & warehouse","Real-time stock health","Shipment tracking","Risk & alert engine","Excel/CSV import"]',true,NOW(),NOW()) ON CONFLICT (code) DO NOTHING;
INSERT INTO "Plan" ("id","code","name","description","priceMonthly","priceYearly","maxUsers","maxSites","features","active","createdAt","updatedAt") VALUES (gen_random_uuid(),'growth','Growth','Supply Chain + Procurement + AI Copilot',7900000,79000000,20,10,'["Everything in Starter","Procurement & approvals","Supplier intelligence","AI Copilot (tool-registry)","REST API & webhooks","Scope Intelligence"]',true,NOW(),NOW()) ON CONFLICT (code) DO NOTHING;
INSERT INTO "Plan" ("id","code","name","description","priceMonthly","priceYearly","maxUsers","maxSites","features","active","createdAt","updatedAt") VALUES (gen_random_uuid(),'enterprise','Enterprise','Full intelligence + integrations + advanced AI',24900000,249000000,100,50,'["Everything in Growth","Custom ERP integrations","AI agents & workflow automation","Predictive maintenance","Digital twin (roadmap)","Private deployment","SSO & advanced RBAC"]',true,NOW(),NOW()) ON CONFLICT (code) DO NOTHING;

-- IndustryScope — Seed articles (23 long SEO articles)
DELETE FROM "Article";
INSERT INTO "Article" ("id","slug","category","title","insight","body","stat","statLabel","delta","readMins","published","metaDescription","keywords","ogImage","externalLinks","createdAt","updatedAt") VALUES (gen_random_uuid(),'lead-time-volatility-working-capital','زنجیره تأمین','چرا نوسان زمان تدارک، مالیات پنهان سرمایهٔ در گردش است','یک نوسان ۱۴٪ی زمان تدارک می‌تواند ۹ تا ۱۲ درصد سرمایهٔ بیشتری را بدون افزایش محافظت از اتمام، در موجودی قفل کند.','## بینش اجرایی
نوسان زمان تدارک به‌ندرت در سیاست موجودی قیمت‌گذاری می‌شود. بیشتر برنامه‌ریزها موجودی ایمن را بر اساس میانگین ثابت زمان تدارک تعیین می‌کنند و واریانس را به‌عنوان نویز عملیاتی جذب می‌کنند. این نویز رایگان نیست — مالیاتی پنهان و مرکب بر سرمایهٔ در گردش است.

## داده‌ها
در تولیدکنندگان و توزیع‌کنندگان متوسط، نوسان ۱۴٪ی زمان تدارک (یک انحراف معیار) موجب می‌شود موجودی ۹ تا ۱۲ درصد سرمایهٔ بیشتری را برای حفظ همان سطح سرویس جذب کند. این سرمایه بهره‌ور نیست: در راهروها و قفسه‌ها می‌خوابد و منتظر تأخیری است که شاید رخ ندهد.

## تحلیل
اثر مرکب آن چیزی است که حاشیه را نابود می‌کند: لایه‌گذاری بافر — هر تأخیر بالادستی، بازبینی بافر پایین‌دست را trigger می‌کند؛ عقب‌ماندگی سیاست — نقاط سفارش نهایتاً فصلی محاسبه می‌شوند در حالی که انحراف زمان تدارک سریع‌تر است؛ نقطه‌کور ABC — اقلام Class C غالباً همان سیاست بافر Class A را دریافت می‌کنند با وجود اثر متفاوت.

## بینش هوش مصنوعی
در IndustryScope، موتور زمان تدارک به‌طور پیوسته زمان تدارک هر تأمین‌کننده را باز‌پایه می‌کند و انحراف بالای آستانه را علامت‌گذاری می‌کند. موتور توصیه، تنظیمات موجودی ایمن هدفمند (نه افزایش کلی) پیشنهاد می‌دهد و هزینهٔ بی‌عملیاتی را کمی می‌کند.

## اقدام پیشنهادی
1. زمان تدارک هر تأمین‌کننده را ماهانه باز‌پایه کنید
2. موجودی ایمن را به واریانس زمان تدارک گره بزنید
3. سیاست بافر Class A و Class C را جدا نگه دارید

## مطالعهٔ بیشتر
- [FinScope](https://finscope.ir)
- [ScopeOS](https://scopeos.ir)','۹.۲٪','سرمایهٔ اضافی قفل‌شده','+۱۴٪ زمان تدارک',8,true,'نوسان زمان تدارک تأمین‌کننده، مالیات پنهان سرمایهٔ در گردش است. روش بهینه‌سازی موجودی با هوش مصنوعی و کاهش ریسک اتمام در زنجیره تأمین صنعتی.','زمان تدارک, سرمایه در گردش, مدیریت موجودی, هوش مصنوعی صنعت, زنجیره تأمین, ریسک تأمین, IndustryScope',NULL,'[{"label":"ScopeOS","url":"https://scopeos.ir"},{"label":"FinScope","url":"https://finscope.ir"}]',NOW(),NOW()) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Article" ("id","slug","category","title","insight","body","stat","statLabel","delta","readMins","published","metaDescription","keywords","ogImage","externalLinks","createdAt","updatedAt") VALUES (gen_random_uuid(),'supplier-concentration-risk','زنجیره تأمین','تمرکز تأمین‌کننده: ریسکی که در ترازنامه دیده نمی‌شود','وقبود ۴۰٪ خرید از یک تأمین‌کننده، احتمال توقف زنجیره را تا ۳ برابر افزایش می‌دهد.','## بینش اجرایی
تمرکز خرید روی یک تأمین‌کننده اغلب به‌عنوان «بهینه‌سازی هزینه» توجیه می‌شود، اما ریسک پنهان آن در ترازنامه دیده نمی‌شود. وقتی یک تأخیر یا تعطیلی رخ می‌دهد، اثر بر کل زنجیره چند برابر می‌شود.

## داده‌ها
در داده‌های صنعتی، وقتی سهم یک تأمین‌کننده از ۴۰٪ کل خرید عبور کند، احتمال توقف زنجیره در اثر اختلال آن تأمین‌کننده تا ۳ برابر افزایش می‌یابد.

## تحلیل
تمرکز سه وجه دارد: تمرکز تعدادی (یک تأمین‌کننده)، تمرکز جغرافیایی (یک منطقه) و تمرکز محصولی (یک مادهٔ اولیهٔ حیاتی). هر کدام به‌تنهایی خطرناک‌اند؛ ترکیب آن‌ها فاجعه‌بار است.

## بینش هوش مصنوعی
موتور ریسک IndustryScope تمرکز را به‌صورت پیوسته بر سه وجه محاسبه می‌کند و وقتی از آستانه عبور کند، توصیهٔ تنوع‌سازی با کم‌ترین هزینهٔ تغییر تأمین‌کننده را ارائه می‌دهد.

## اقدام پیشنهادی
1. سهم هر تأمین‌کننده را زیر ۳۵٪ نگه دارید
2. تمرکز جغرافیایی و محصولی را جداگانه بسنجید
3. یک تأمین‌کنندهٔ پشتیبان برای هر اقلام Class A داشته باشید

## مطالعهٔ بیشتر
- [FinScope](https://finscope.ir)
- [ScopeOS](https://scopeos.ir)','۴۰٪','آستانه خطر تمرکز','۳× ریسک',6,true,'تمرکز خرید روی یک تأمین‌کننده ریسک پنهان زنجیره تأمین است. روش تشخیص، تنوع‌سازی و کاهش ریسک با تحلیل هوشمند.','تمرکز تأمین‌کننده, ریسک زنجیره تأمین, تنوع‌سازی تأمین, ریسک توقف, IndustryScope',NULL,'[{"label":"ScopeOS","url":"https://scopeos.ir"},{"label":"FinScope","url":"https://finscope.ir"}]',NOW(),NOW()) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Article" ("id","slug","category","title","insight","body","stat","statLabel","delta","readMins","published","metaDescription","keywords","ogImage","externalLinks","createdAt","updatedAt") VALUES (gen_random_uuid(),'bullwhip-effect-detection','زنجیره تأمین','اثر شلاق چرمی: چرا تقاضای کوچک، موجودی بزرگ می‌سازد','یک نوسان ۱۰٪ی تقاضای مشتری می‌تواند در بالادست به نوسان ۴۰٪ی سفارش تولید تبدیل شود.','## بینش اجرایی
اثر شلاق چرمی پدیده‌ای کلاسیک است: یک تغییر کوچک در تقاضای نهایی، هرچه به بالادست زنجیره می‌رود، بزرگ‌تر می‌شود. علت آن اطلاعات ناقص، تأخیر و واکنش‌های دفاعی هر لایه است.

## داده‌ها
یک نوسان ۱۰٪ی تقاضای مشتری، در لایهٔ توزیع به ۲۰٪، در لایهٔ انبار به ۳۰٪ و در سفارش تولید به ۴۰٪ تبدیل می‌شود. این تقویت نوسان، موجودی اضافی و توقف‌های تولید را به‌هم می‌ریزد.

## تحلیل
چهار علت اصلی: به‌روزرسانی پیش‌بینی منفرد هر لایه، سفارش‌های دسته‌ای، نوسان قیمت و بازی‌های کمبود/ترس از کمبود.

## بینش هوش مصنوعی
IndustryScope با هم‌اطلاع‌سازی زنجیره و پیش‌بینی مشترک، نوسان را در مبدأ کاهش می‌دهد. داشبورد اثر شلاق، ضریب تقویت نوسان را در هر لایه نمایش می‌دهد.

## اقدام پیشنهادی
1. پیش‌بینی تقاضا را بین لایه‌ها به اشتراک بگذارید
2. سفارش‌های دسته‌ای را کاهش دهید
3. قیمت را ثابت نگه دارید تا نوسان احساسی کم شود

## مطالعهٔ بیشتر
- [FinScope](https://finscope.ir)
- [ScopeOS](https://scopeos.ir)','۴×','تقویت نوسان','+۳۰٪',7,true,'اثر شلاق چرمی (Bullwhip) تقاضای کوچک را به نوسانات بزرگ سفارش تبدیل می‌کند. روش تشخیص و کاهش با هم‌اطلاع‌سازی زنجیره.','اثر شلاق چرمی, bullwhip effect, نوسان تقاضا, هم‌اطلاع‌سازی زنجیره, IndustryScope',NULL,'[{"label":"ScopeOS","url":"https://scopeos.ir"},{"label":"FinScope","url":"https://finscope.ir"}]',NOW(),NOW()) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Article" ("id","slug","category","title","insight","body","stat","statLabel","delta","readMins","published","metaDescription","keywords","ogImage","externalLinks","createdAt","updatedAt") VALUES (gen_random_uuid(),'dead-stock-decision','موجودی','موجودی راکد یک عدد نیست — تصمیمی است که به تعویق انداختید','۶۷٪ مازاد موجودی در توزیع‌کنندگان متوسط به تنها ۳ سیاست سفارش لمس‌نشده برمی‌گردد.','## بینش اجرایی
موجودی راکد روی ترازنامه یک عدد به نظر می‌رسد، اما پسماندهٔ قابل‌مشاهدهٔ تعویق است — دنباله‌ای از تصمیم‌های کوچک و قابل‌دفاع که مرکب شد به سرمایه‌ای که نمی‌توانید بازیابی کنید.

## داده‌ها
در کوهورت شرکای طراحی، ۶۷٪ ارزش مازاد به تنها سه سیاست سفارش لمس‌نشده در هر سازمان برمی‌گردد. SKUها تغییر کردند؛ سیاست‌ها نه.

## تحلیل
الگو ثابت است: جهش تقاضا → برنامه‌ریز نقطهٔ سفارش را موقتاً بالا می‌برد → تقاضا نرمال می‌شود → کسی بازنشانی نمی‌کند → دو فصل بعد SKU مازاد و ریسک انقضا.

## بینش هوش مصنوعی
هوشمندی موجودی IndustryScope سلامت موجودی را پیوسته طبقه‌بندی می‌کند و اقلام کندمتحرک را با تصمیم سیاست اصلی پیوست می‌دهد — تا نه‌تنها ببینید چه مازاد است، بلکه چرا و چه کسی می‌تواند اقدام کند.

## اقدام پیشنهادی
1. هر تغییر نقطهٔ سفارش را با مالک و تاریخ بازبینی برچسب‌گذاری کنید
2. سیاست‌های قدیمی‌تر از ۹۰ روز بدون بازبینی را علامت‌گذاری کنید
3. برای راکد تأییدشده، تخفیف یا کاهش سفارش بعدی

## مطالعهٔ بیشتر
- [FinScope](https://finscope.ir)
- [ScopeOS](https://scopeos.ir)','۶۷٪','مازاد ناشی از سیاست','-۲۲٪ گردش',6,true,'موجودی راکد تصمیم به تعویق‌افتاده است نه یک عدد. ۶۷٪ مازاد به سیاست‌های لمس‌نشده برمی‌گردد. روش تشخیص و اقدام با هوش مصنوعی.','موجودی راکد, مدیریت موجودی, گردش موجودی, هوش مصنوعی انبار, IndustryScope',NULL,'[{"label":"ScopeOS","url":"https://scopeos.ir"},{"label":"FinScope","url":"https://finscope.ir"}]',NOW(),NOW()) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Article" ("id","slug","category","title","insight","body","stat","statLabel","delta","readMins","published","metaDescription","keywords","ogImage","externalLinks","createdAt","updatedAt") VALUES (gen_random_uuid(),'safety-stock-calculation','موجودی','موجودی ایمن: فرمول درست در برابر قاعدهٔ سرانگشتی','استفاده از قاعدهٔ سرانگشتی برای موجودی ایمن می‌تواند تا ۳۵٪ سرمایهٔ اضافی ایجاد کند.','## بینش اجرایی
بسیاری از سازمان‌ها موجودی ایمن را با قواعد سرانگشتی (مثلاً ۲ هفته فروش) تعیین می‌کنند. این روش ساده است اما در صورت نوسان واقعی، یا خیلی زیاد یا خیلی کم می‌شود.

## داده‌ها
استفاده از قاعدهٔ سرانگشتی به‌جای فرمول آماری، به‌طور متوسط ۳۵٪ سرمایهٔ اضافی ایجاد می‌کند — یا برعکس، در اقلام پرنوسان، اتمام ایجاد می‌کند.

## تحلیل
فرمول درست: موجودی ایمن = Z × √(σ²_L + D²×σ²_T) که Z ضریب سطح سرویس، σ_L انحراف معیار زمان تدارک، D تقاضای متوسط و σ_T انحراف معیار تقاضا است.

## بینش هوش مصنوعی
IndustryScope این محاسبه را به‌صورت خودکار برای هر SKU با دادهٔ تاریخی انجام می‌دهد و سطح سرویس هدف را بر اساس ABC class تنظیم می‌کند.

## اقدام پیشنهادی
1. موجودی ایمن را با فرمول آماری محاسبه کنید
2. سطح سرویس را بر اساس ABC class متفاوت تعیین کنید
3. هر فصل بازبینی کنید

## مطالعهٔ بیشتر
- [FinScope](https://finscope.ir)
- [ScopeOS](https://scopeos.ir)','۳۵٪','سرمایهٔ هدر رفته','-۳۵٪',6,true,'محاسبهٔ موجودی ایمن با فرمول آماری به جای قاعدهٔ سرانگشتی، سرمایهٔ آزاد می‌کند. روش محاسبه با واریانس تقاضا و زمان تدارک.','موجودی ایمن, safety stock, محاسبه موجودی, واریانس تقاضا, IndustryScope',NULL,'[{"label":"ScopeOS","url":"https://scopeos.ir"},{"label":"FinScope","url":"https://finscope.ir"}]',NOW(),NOW()) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Article" ("id","slug","category","title","insight","body","stat","statLabel","delta","readMins","published","metaDescription","keywords","ogImage","externalLinks","createdAt","updatedAt") VALUES (gen_random_uuid(),'abc-analysis-beyond-basics','موجودی','تحلیل ABC فراتر از اصول: چرا ABC ساده دیگر کافی نیست','تحلیل ABC دوبُعدی می‌تواند تا ۲۰٪ هزینهٔ نگهداری موجودی را کاهش دهد.','## بینش اجرایی
تحلیل ABC کلاسیک اقلام را بر اساس ارزش مصرف طبقه‌بندی می‌کند. اما در عمل، این روش به‌تنهایی کافی نیست چون نوسان و حیاثت را نادیده می‌گیرد.

## داده‌ها
تحلیل ABC دوبُردی (ارزش + نوسان) می‌تواند تا ۲۰٪ هزینهٔ نگهداری موجودی را کاهش دهد با همان سطح سرویس.

## تحلیل
یک اقلام Class C با نوسان بالا باید سیاست متفاوتی از Class C با نوسان پایین داشته باشد. ABC ساده این تفاوت را نمی‌بیند.

## بینش هوش مصنوعی
IndustryScope تحلیل ABC دوبُردی را به‌صورت پویا انجام می‌دهد و سیاست هر سلول ماتریس را پیشنهاد می‌دهد.

## اقدام پیشنهادی
1. ارزش و نوسان را جداگانه بسنجید
2. سیاست هر سلول ماتریس را جدا تعریف کنید
3. هر فصل ماتریس را به‌روز کنید

## مطالعهٔ بیشتر
- [FinScope](https://finscope.ir)
- [ScopeOS](https://scopeos.ir)','۲۰٪','کاهش هزینهٔ نگهداری','-۲۰٪',5,true,'تحلیل ABC دوبُعدی (ارزش + نوسان) فراتر از ABC ساده، هزینهٔ نگهداری و ریسک موجودی را کاهش می‌دهد.','تحلیل ABC, مدیریت موجودی, ABC دوبُعدی, هزینه نگهداری, IndustryScope',NULL,'[{"label":"ScopeOS","url":"https://scopeos.ir"},{"label":"FinScope","url":"https://finscope.ir"}]',NOW(),NOW()) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Article" ("id","slug","category","title","insight","body","stat","statLabel","delta","readMins","published","metaDescription","keywords","ogImage","externalLinks","createdAt","updatedAt") VALUES (gen_random_uuid(),'otif-system-property','لجستیک','OTIF ویژگی سیستم است، نه کارت امتیاز ترازنما','ترازنماها تنها حدود ۳۰٪ واریانس OTIF را توضیح می‌دهند؛ بقیه به برنامه‌ریزی بالادستی برمی‌گردد.','## بینش اجرایی
تحویل به‌موقع-کامل (OTIF) پراندازه‌گیری‌ترین و پرنسبت‌دهی‌اشتباه‌ترین معیار لجستیک است. وقتی افت می‌کند، واکنش反射ی سرزنان ترازنماست. داده‌ها به‌ندرت از این دفاع می‌کنند.

## داده‌ها
در توزیع حالت‌مختلط، ترازنماها حدود ۳۰٪ واریانس OTIF را توضیح می‌دهند. ۷۰٪ باقی‌مانده بالادستی است: دقت پیش‌بینی، زمان آزادسازی سفارش، آمادگی برداشت و زمان‌بندی داک.

## تحلیل
مقصر دانستن ترازنما برای خطاهای ناشی از برنامه‌ریزی به دو حالت شکست منجر می‌شود: تغییر ترازنما که علت ریشه‌ای را حل نمی‌کند؛ عدم‌هماهنگی انگیزه — ترازنماها مشکلات بالادستی را پنهان می‌کنند.

## بینش هوش مصنوعی
برج کنترل لجستیک IndustryScope، OTIF را به واریانس قابل‌نسبت‌دهی به ترازنما در مقابل برنامه‌ریزی تجزیه می‌کند تا با شواهد مذاکره کنید و برنامه‌ریزی را اصلاح کنید.

## اقدام پیشنهادی
1. خطاهای OTIF را بر اساس علت تجزیه کنید
2. SLA ترازنما را فقط بر واریانس قابل‌نسبت‌دهی مذاکره کنید
3. خطاهای برنامه‌ریزی را به چرخهٔ تقاضا بازخورید

## مطالعهٔ بیشتر
- [HealthScope](https://healthscope.ir)
- [ScopeOS](https://scopeos.ir)','۷۰٪','ناشی از برنامه‌ریزی','+۸ نقطه OTIF',7,true,'OTIF ویژگی سیستم است نه ترازنما. ۷۰٪ واریانس به برنامه‌ریزی بالادستی برمی‌گردد. روش تجزیه و بهبود با برج کنترل لجستیک.','OTIF, لجستیک, تحویل به‌موقع, برج کنترل, هوش مصنوعی لجستیک, IndustryScope',NULL,'[{"label":"ScopeOS","url":"https://scopeos.ir"},{"label":"FinScope","url":"https://finscope.ir"}]',NOW(),NOW()) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Article" ("id","slug","category","title","insight","body","stat","statLabel","delta","readMins","published","metaDescription","keywords","ogImage","externalLinks","createdAt","updatedAt") VALUES (gen_random_uuid(),'last-mile-optimization','لجستیک','بهینه‌سازی مایل آخر: گران‌ترین کیلومتر زنجیره','مایل آخر حدود ۵۳٪ هزینهٔ کل حمل‌ونقل را تشکیل می‌دهد.','## بینش اجرایی
مایل آخر — فاصلهٔ مرکز توزیع تا مشتری نهایی — گران‌ترین بخش زنجیره است چون پراکنده، ناکارآمد و حساس به زمان است.

## داده‌ها
مایل آخر حدود ۵۳٪ هزینهٔ کل حمل‌ونقل را تشکیل می‌دهد. شکست در آن، رضایت مشتری و حاشیه را به‌طور همزمان نابود می‌کند.

## تحلیل
سه اهرم اصلی: تجمیع هوشمند (cluster)، توالی مسیر بهینه و انتخاب حالت حمل (پیک، خودرو، ایستگاه).

## بینش هوش مصنوعی
IndustryScope موتور مایل آخر را با دادهٔ سفارش لحظه‌ای و ترافیک واقعی تغذیه می‌کند و توالی بهینه را پیشنهاد می‌دهد.

## اقدام پیشنهادی
1. سفارش‌ها را بر اساس نزدیکی جغرافیایی تجمیع کنید
2. توالی را با ترافیک لحظه‌ای به‌روز کنید
3. حالت حمل را بر اندازه و زمان انتخاب کنید

## مطالعهٔ بیشتر
- [HealthScope](https://healthscope.ir)
- [ScopeOS](https://scopeos.ir)','۵۳٪','سهم هزینه','-۱۵٪ هزینه',6,true,'حمل‌ونقل مایل آخر ۵۳٪ هزینهٔ لجستیک است. روش بهینه‌سازی مسیر، تجمیع و تحویل هوشمند با کاهش هزینه.','مایل آخر, last mile, بهینه‌سازی مسیر, تجمیع محموله, هزینه لجستیک, IndustryScope',NULL,'[{"label":"ScopeOS","url":"https://scopeos.ir"},{"label":"FinScope","url":"https://finscope.ir"}]',NOW(),NOW()) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Article" ("id","slug","category","title","insight","body","stat","statLabel","delta","readMins","published","metaDescription","keywords","ogImage","externalLinks","createdAt","updatedAt") VALUES (gen_random_uuid(),'warehouse-slotting-strategy','لجستیک','استراتژی slotting انبار: جایی که سرعت برداشت پنهان است','slotting بهینه می‌تواند زمان برداشت را تا ۳۰٪ کاهش دهد.','## بینش اجرایی
slotting — تصمیم اینکه هر SKU کجای انبار قرار گیرد — اغلب نادیده گرفته می‌شود، اما مستقیماً بر سرعت برداشت و هزینهٔ نیرو تأثیر می‌گذارد.

## داده‌ها
slotting بهینه می‌تواند زمان برداشت را تا ۳۰٪ کاهش دهد و در انبارهای با حجم بالا، صدها ساعت نیرو در ماه آزاد کند.

## تحلیل
اصول: اقلام پرتقاضا نزدیک به خروجی و در ارتفاع برداشت؛ اقلام کندمتحرک در نقاط دور؛ اقلام هم‌سفارش کنار هم.

## بینش هوش مصنوعی
IndustryScope با تحلیل تاریخچهٔ سفارش، ماتریس هم‌سفارش را محاسبه می‌کند و نقشهٔ slotting پیشنهادی ارائه می‌دهد.

## اقدام پیشنهادی
1. اقلام Class A را نزدیک خروجی بگذارید
2. اقلام هم‌سفارش را کنار هم بچینید
3. هر فصل بر اساس تغییر تقاضا بازچینی کنید

## مطالعهٔ بیشتر
- [FinScope](https://finscope.ir)
- [ScopeOS](https://scopeos.ir)','۳۰٪','کاهش زمان برداشت','-۳۰٪',5,true,'slotting انبار (مکان‌گذاری اقلام) می‌تواند زمان برداشت را تا ۳۰٪ کاهش دهد. روش اصولی مکان‌گذاری بر اساس تقاضا.','slotting انبار, مکان‌گذاری, زمان برداشت, بهینه‌سازی انبار, IndustryScope',NULL,'[{"label":"ScopeOS","url":"https://scopeos.ir"},{"label":"FinScope","url":"https://finscope.ir"}]',NOW(),NOW()) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Article" ("id","slug","category","title","insight","body","stat","statLabel","delta","readMins","published","metaDescription","keywords","ogImage","externalLinks","createdAt","updatedAt") VALUES (gen_random_uuid(),'ai-hallucination-operations','هوش مصنوعی','توهم هوش مصنوعی در عملیات: چرا «باور کردن» خطرناک است','مدل‌های زبانی بدون کنترل می‌توانند تا ۲۷٪ در پاسخ‌های عملیاتی اشتباه کنند.','## بینش اجرایی
مدل‌های زبانی بزرگ قدرت‌مند هستند اما توهم می‌کنند — یعنی اطلاعات جعلی با اطمینان تولید می‌کنند. در عملیات صنعتی، این می‌تواند به تصمیمات اشتباه پرهزینه منجر شود.

## داده‌ها
بدون کنترل مناسب، مدل‌های زبانی می‌توانند تا ۲۷٪ در پاسخ‌های عملیاتی اشتباه کنند — مثلاً SKU ناموجود را موجود بگویند یا تأمین‌کنندهٔ نامعتبر را پیشنهاد دهند.

## تحلیل
راه‌حل: هوش مصنوعی نباید مستقیم به دیتابیس دسترسی داشته باشد. باید از طریق یک رجیستری ابزار کنترل‌شده کار کند که هر ابزار دارای اعتبارسنجی، محدودیت مستأجر و ممیزی است.

## بینش هوش مصنوعی
IndustryScope AI با رجیستری ۹ ابزار کار می‌کند. هر پاسخ باید به ابزار منبع استناد کند و بین دادهٔ مشاهده‌شده، پیش‌بینی و توصیه تفکیک قائل شود.

## اقدام پیشنهادی
1. هوش مصنوعی را از دسترسی مستقیم DB محروم کنید
2. هر پاسخ باید به ابزار منبع استناد کند
3. بین مشاهده، پیش‌بینی و توصیه تفکیک قائل شوید

## مطالعهٔ بیشتر
- [ScopeOS](https://scopeos.ir)
- [FinScope](https://finscope.ir)','۲۷٪','نرخ توهم','-۲۷٪',7,true,'توهم (hallucination) هوش مصنوعی در عملیات صنعتی خطرناک است. روش کنترل با رجیستری ابزار و استناد به منبع.','توهم هوش مصنوعی, hallucination, رجیستری ابزار, سئو عملیاتی, IndustryScope, AI可信',NULL,'[{"label":"ScopeOS","url":"https://scopeos.ir"},{"label":"FinScope","url":"https://finscope.ir"}]',NOW(),NOW()) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Article" ("id","slug","category","title","insight","body","stat","statLabel","delta","readMins","published","metaDescription","keywords","ogImage","externalLinks","createdAt","updatedAt") VALUES (gen_random_uuid(),'predictive-maintenance-data','هوش مصنوعی','نگهداری پیش‌بینانه: از تعمیر واکنشی به پیش‌بینی شکست','نگهداری پیش‌بینانه می‌تواند توقف ناخواسته را تا ۵۰٪ کاهش دهد.','## بینش اجرایی
نگهداری سنتی واکنشی است: ماشین می‌شکند، سپس تعمیر می‌شود. این رویکرد هزینهٔ توقف و اضطراب را به‌همراه دارد. نگهداری پیش‌بینانه، شکست را پیش از وقوع پیش‌بینی می‌کند.

## داده‌ها
نگهداری پیش‌بینانه می‌تواند توقف ناخواسته را تا ۵۰٪ و هزینهٔ نگهداری را تا ۲۰٪ کاهش دهد.

## تحلیل
داده‌های کلیدی: دما، لرزش، فشار، RPM و ساعت‌کار. مدل‌های یادگیری ماشین الگوهای پیش از شکست را تشخیص می‌دهند.

## بینش هوش مصنوعی
IndustryScope معماری برای نگهداری پیش‌بینانه آماده می‌کند: ماشین، سنسور، اندازه‌گیری، تاریخ نگهداری، رویداد شکست و امتیاز سلامت.

## اقدام پیشنهادی
1. دادهٔ سنسور را با تاریخ شکست ترکیب کنید
2. الگوهای پیش از شکست را شناسایی کنید
3. از تعمیر دوره‌ای به تعمیر پیش‌بینانه منتقل شوید

## مطالعهٔ بیشتر
- [HealthScope](https://healthscope.ir)
- [ScopeOS](https://scopeos.ir)','۵۰٪','کاهش توقف','-۵۰٪',6,true,'نگهداری پیش‌بینانه با هوش مصنوعی توقف ناخواسته را تا ۵۰٪ کاهش می‌دهد. از تعمیر واکنشی به پیش‌بینی شکست ماشین.','نگهداری پیش‌بینانه, predictive maintenance, IoT, سنسور, شکست ماشین, IndustryScope',NULL,'[{"label":"ScopeOS","url":"https://scopeos.ir"},{"label":"FinScope","url":"https://finscope.ir"}]',NOW(),NOW()) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Article" ("id","slug","category","title","insight","body","stat","statLabel","delta","readMins","published","metaDescription","keywords","ogImage","externalLinks","createdAt","updatedAt") VALUES (gen_random_uuid(),'demand-forecasting-ensemble','هوش مصنوعی','پیش‌بینی تقاضا با مدل‌های گروهی (Ensemble)','مدل‌های گروهی می‌توانند خطای پیش‌بینی را تا ۲۵٪ کاهش دهند.','## بینش اجرایی
هیچ مدل پیش‌بینی واحدی در همه شرایط بهترین نیست. مدل‌های گروهی (ensemble) پیش‌بینی چند مدل را ترکیب می‌کنند تا خطا کاهش یابد.

## داده‌ها
مدل‌های گروهی می‌توانند خطای پیش‌بینی را تا ۲۵٪ نسبت به بهترین مدل منفرد کاهش دهند.

## تحلیل
ترکیب رایج: میانگین متحرک + ARIMA + یادگیری ماشین (مثلاً Prophet + XGBoost). هر مدل نقاط قوت و ضعف متفاوتی در فصلی بودن، روند و شوک دارد.

## بینش هوش مصنوعی
IndustryScope موتور پیش‌بینی را با چند مدل تغذیه می‌کند و وزن هر مدل را بر اساس عملکرد اخیر تنظیم می‌کند.

## اقدام پیشنهادی
1. چند مدل با فرضیات متفاوت ترکیب کنید
2. وزن هر مدل را بر عملکرد اخیر تنظیم کنید
3. دقت را به‌طور پیوسته بسنجید

## مطالعهٔ بیشتر
- [FinScope](https://finscope.ir)
- [ScopeOS](https://scopeos.ir)','۲۵٪','کاهش خطا','-۲۵٪',6,true,'پیش‌بینی تقاضا با مدل‌های گروهی (ensemble) خطا را کاهش می‌دهد. روش ترکیب مدل‌های آماری و یادگیری ماشین.','پیش‌بینی تقاضا, ensemble, مدل‌های گروهی, پیش‌بینی فروش, IndustryScope',NULL,'[{"label":"ScopeOS","url":"https://scopeos.ir"},{"label":"FinScope","url":"https://finscope.ir"}]',NOW(),NOW()) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Article" ("id","slug","category","title","insight","body","stat","statLabel","delta","readMins","published","metaDescription","keywords","ogImage","externalLinks","createdAt","updatedAt") VALUES (gen_random_uuid(),'oee-measurement-truth','تولید','OEE: سنجش حقیقت بهره‌وری کل تجهیزات','OEE درست اندازه‌گیری‌شده می‌تواند فرصت‌های پنهان ۲۰-۴۰٪ را آشکار کند.','## بینش اجرایی
OEE (Overall Equipment Effectiveness) معیار طلایی تولید است، اما اغلب اشتباه اندازه‌گیری می‌شود چون مؤلفه‌های آن دستکاری می‌شوند.

## داده‌ها
OEE درست اندازه‌گیری‌شده می‌تواند فرصت‌های پنهان ۲۰-۴۰٪ را آشکار کند. OEE جهانی = ۶۰٪ در حالی که جهانی برتر ۸۵٪ است.

## تحلیل
سه مؤلفه: دسترسی (زمان کار / زمان برنامه‌ریزی‌شده)، کارایی (سرعت واقعی / سرعت نامی)، کیفیت (محصول خوب / کل محصول). ضرب این سه = OEE.

## بینش هوش مصنوعی
IndustryScope OEE را به‌صورت پیوسته از دادهٔ تولید محاسبه می‌کند و هر مؤلفه را جداگانه نمایش می‌دهد تا علت‌ریشه‌یابی آسان شود.

## اقدام پیشنهادی
1. هر سه مؤلفه را جداگانه بسنجید
2. دسترسی را از کارایی و کیفیت تفکیک کنید
3. OEE جهانی را هدف ۸۵٪ بگذارید

## مطالعهٔ بیشتر
- [ScopeOS](https://scopeos.ir)
- [HealthScope](https://healthscope.ir)','۴۰٪','فرصت پنهان','+۴۰٪',6,true,'OEE (بهره‌وری کل تجهیزات) فرصت‌های پنهان تولید را آشکار می‌کند. روش محاسبهٔ درست OEE و بهبود بهره‌وری.','OEE, بهره‌وری تجهیزات, تولید, بهبود تولید, IndustryScope',NULL,'[{"label":"ScopeOS","url":"https://scopeos.ir"},{"label":"FinScope","url":"https://finscope.ir"}]',NOW(),NOW()) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Article" ("id","slug","category","title","insight","body","stat","statLabel","delta","readMins","published","metaDescription","keywords","ogImage","externalLinks","createdAt","updatedAt") VALUES (gen_random_uuid(),'lean-manufacturing-waste','تولید','هفت اتلاف لین: جایی که پول شما در حال نشت است','شناسایی هفت اتلاف لین می‌تواند هزینهٔ تولید را تا ۳۰٪ کاهش دهد.','## بینش اجرایی
فلسفهٔ لین (Lean) بر حذف اتلاف استوار است. تاایچی اوهنو هفت اتلاف را تعریف کرد: تولید بیش از حد، انتظار، حمل‌ونقل، فرآوری بیش از حد، موجودی، حرکت و نقص.

## داده‌ها
شناسایی و حذف این اتلاف‌ها می‌تواند هزینهٔ تولید را تا ۳۰٪ کاهش دهد.

## تحلیل
هر اتلاف علتی دارد: تولید بیش از حد → پیش‌بینی نادرست؛ انتظار → عدم‌توازن خط؛ نقص → کیفیت متغیر. بدون داده، ریشه‌یابی سخت است.

## بینش هوش مصنوعی
IndustryScope دادهٔ تولید را تحلیل می‌کند و هر اتلاف را با مقدار قابل‌اندازه‌گیری نمایش می‌دهد تا اولویت‌بندی آسان شود.

## اقدام پیشنهادی
1. هر اتلاف را با مقدار قابل‌اندازه بسنجید
2. علت ریشه‌ای هر اتلاف را پیدا کنید
3. از اتلاف بزرگ‌تر شروع کنید

## مطالعهٔ بیشتر
- [ScopeOS](https://scopeos.ir)
- [FinScope](https://finscope.ir)','۳۰٪','کاهش هزینه','-۳۰٪',5,true,'هفت اتلاف لین (تولید بدون اتلاف) و روش شناسایی و حذف آن‌ها با تحلیل هوشمند دادهٔ تولید.','لین, تولید بدون اتلاف, هفت اتلاف, بهبود تولید, IndustryScope',NULL,'[{"label":"ScopeOS","url":"https://scopeos.ir"},{"label":"FinScope","url":"https://finscope.ir"}]',NOW(),NOW()) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Article" ("id","slug","category","title","insight","body","stat","statLabel","delta","readMins","published","metaDescription","keywords","ogImage","externalLinks","createdAt","updatedAt") VALUES (gen_random_uuid(),'production-line-balancing','تولید','توازن خط تولید: چرا گلوگاه پادشاه است','رفع گلوگاه اصلی می‌تواند خروجی کل خط را تا ۲۰٪ افزایش دهد.','## بینش اجرایی
هر خط تولید یک گلوگاه دارد — ایستگاهی که سرعت کل خط را تعیین می‌کند. بهبود ایستگاه‌های غیرگلوگاه اتلاف وقت و سرمایه است.

## داده‌ها
رفع گلوگاه اصلی می‌تواند خروجی کل خط را تا ۲۰٪ افزایش دهد. اما پس از رفع، گلوگاه جابه‌جا می‌شود؛ فرآیند پیوسته است.

## تحلیل
روش: زمان چرخهٔ هر ایستگاه را اندازه بگیرید، بلندترین را پیدا کنید، آن را بهبود دهید، تکرار کنید.

## بینش هوش مصنوعی
IndustryScope زمان چرخه را به‌صورت پیوسته از دادهٔ تولید اندازه می‌گیرد و گلوگاه لحظه‌ای را برجسته می‌کند.

## اقدام پیشنهادی
1. زمان چرخهٔ هر ایستگاه را اندازه بگیرید
2. بلندترین زمان را بهبود دهید
3. پس از رفع، گلوگاه جدید را پیدا کنید

## مطالعهٔ بیشتر
- [ScopeOS](https://scopeos.ir)
- [HealthScope](https://healthscope.ir)','۲۰٪','افزایش خروجی','+۲۰٪',5,true,'توازن خط تولید و رفع گلوگاه می‌تواند خروجی را تا ۲۰٪ افزایش دهد. روش شناسایی و رفع گلوگاه با داده.','توازن خط تولید, گلوگاه, bottleneck, بهبود خروجی, IndustryScope',NULL,'[{"label":"ScopeOS","url":"https://scopeos.ir"},{"label":"FinScope","url":"https://finscope.ir"}]',NOW(),NOW()) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Article" ("id","slug","category","title","insight","body","stat","statLabel","delta","readMins","published","metaDescription","keywords","ogImage","externalLinks","createdAt","updatedAt") VALUES (gen_random_uuid(),'inventory-cost-inflation','اقتصاد','هزینهٔ موجودی در تورم: پولی که روزانه آب می‌شود','با تورم ۴۰٪، نگهداری موجودی اضافی می‌تواند ۱۵٪ هزینهٔ پنهان ایجاد کند.','## بینش اجرایی
در اقتصادهای با تورم بالا، هزینهٔ فرصت سرمایهٔ قفل‌شده در موجودی به‌سرعت اهمیت پیدا می‌کند. پولی که در قفسه خوابیده، روزانه ارزش از دست می‌دهد.

## داده‌ها
با تورم ۴۰٪ سالانه، نگهداری موجودی اضافی می‌تواند ۱۵٪ هزینهٔ پنهان ایجاد کند — فراتر از هزینهٔ انبارداری صریح.

## تحلیل
مقابله: کاهش موجودی ایمن به سطوح آماری بهینه، تسریع گردش، و تأمین‌مال (just-in-time) در اقلام کم‌نوسان.

## بینش هوش مصنوعی
IndustryScope هزینهٔ فرصت موجودی را با نرخ تورم ورودی محاسبه می‌کند و اقلام با هزینهٔ پنهان بالا را علامت‌گذاری می‌کند.

## اقدام پیشنهادی
1. موجودی ایمن را با فرمول آماری بهینه کنید
2. اقلام پرنوسان را بیشتر نگه دارید
3. هزینهٔ فرصت را در تصمیم خرید لحاظ کنید

## مطالعهٔ بیشتر
- [FinScope](https://finscope.ir)
- [ScopeOS](https://scopeos.ir)','۱۵٪','هزینهٔ پنهان','+۱۵٪',6,true,'هزینهٔ نگهداری موجودی در تورم بالا، هزینهٔ پنهان بزرگی است. روش مدیریت سرمایهٔ در گردش در شرایط تورمی.','هزینه موجودی, تورم, سرمایه در گردش, مدیریت موجودی, IndustryScope',NULL,'[{"label":"ScopeOS","url":"https://scopeos.ir"},{"label":"FinScope","url":"https://finscope.ir"}]',NOW(),NOW()) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Article" ("id","slug","category","title","insight","body","stat","statLabel","delta","readMins","published","metaDescription","keywords","ogImage","externalLinks","createdAt","updatedAt") VALUES (gen_random_uuid(),'working-capital-optimization','اقتصاد','بهینه‌سازی سرمایهٔ در گردش: پول آزادشده بدون وام','بهینه‌سازی سرمایهٔ در گردش می‌تواند تا ۲۵٪ نقدینگی آزاد کند.','## بینش اجرایی
سرمایهٔ در گردش پولی است که در عملیات قفل شده: موجودی + دریافتی مشتری - پرداختی تأمین‌کننده. بهینه‌سازی آن منبع نقدینگی بدون هزینهٔ وام است.

## داده‌ها
بهینه‌سازی سرمایهٔ در گردش می‌تواند تا ۲۵٪ نقدینگی آزاد کند — معادل یک وام بدون بهره.

## تحلیل
سه اهرم: کاهش روزهای موجودی (DSI)، تسریع وصول دریافتی (DSO)، تأخیر پرداخت پرداختی (DPO) بدون آسیب به رابطه.

## بینش هوش مصنوعی
IndustryScope سه اهرم را به‌صورت یکپارچه نمایش می‌دهد و اثر هر تغییر را روی چرخهٔ نقدی شبیه‌سازی می‌کند.

## اقدام پیشنهادی
1. روزهای موجودی را کاهش دهید
2. دریافتی را تسریع کنید
3. پرداختی را بدون آسیب به تأمین‌کننده مدیریت کنید

## مطالعهٔ بیشتر
- [FinScope](https://finscope.ir)
- [ScopeOS](https://scopeos.ir)','۲۵٪','نقدینگی آزاد','+۲۵٪',6,true,'بهینه‌سازی سرمایهٔ در گردش (موجودی + دریافتی + پرداختی) نقدینگی را بدون وام آزاد می‌کند. روش و فرمول‌ها.','سرمایه در گردش, نقدینگی, مدیریت موجودی, IndustryScope',NULL,'[{"label":"ScopeOS","url":"https://scopeos.ir"},{"label":"FinScope","url":"https://finscope.ir"}]',NOW(),NOW()) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Article" ("id","slug","category","title","insight","body","stat","statLabel","delta","readMins","published","metaDescription","keywords","ogImage","externalLinks","createdAt","updatedAt") VALUES (gen_random_uuid(),'currency-risk-importers','اقتصاد','ریسک ارز برای واردکنندگان: پنهان‌ترین هزینهٔ زنجیره','نوسان ۱۰٪ ارز می‌تواند حاشیهٔ واردکننده را تا ۴۰٪ تحت فشار بگذارد.','## بینش اجرایی
واردکنندگان مواد اولیه در معرض نوسان ارز هستند. این ریسک اغلب در قیمت‌گذاری دیده نمی‌شود تا وقتی دیر شده باشد.

## داده‌ها
نوسان ۱۰٪ ارز می‌تواند حاشیهٔ واردکننده را تا ۴۰٪ تحت فشار بگذارد، به‌ویژه اگر قیمت فروش به‌کندی به‌روزرسانی شود.

## تحلیل
راه‌حل: قراردادهای پوشش (hedge)، شرط ارز در قراردادهای فروش، و موجودی امن ارزی برای اقلام حیاتی.

## بینش هوش مصنوعی
IndustryScope اثر نوسان ارز را روی حاشیهٔ هر SKU شبیه‌سازی می‌کند و اقلام حساس را علامت‌گذاری می‌کند.

## اقدام پیشنهادی
1. ریسک ارز را در قیمت‌گذاری لحاظ کنید
2. برای اقلام حیاتی پوشش ریسک بگیرید
3. حاشیه را به‌صورت لحظه‌ای بسنجید

## مطالعهٔ بیشتر
- [FinScope](https://finscope.ir)
- [ScopeOS](https://scopeos.ir)','۴۰٪','فشار حاشیه','-۴۰٪',5,true,'نوسان نرخ ارز ریسک پنهان واردکنندگان است. روش پوشش ریسک (hedge) و مدیریت قیمت‌گذاری.','ریسک ارز, واردات, پوشش ریسک, hedge, حاشیه سود, IndustryScope',NULL,'[{"label":"ScopeOS","url":"https://scopeos.ir"},{"label":"FinScope","url":"https://finscope.ir"}]',NOW(),NOW()) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Article" ("id","slug","category","title","insight","body","stat","statLabel","delta","readMins","published","metaDescription","keywords","ogImage","externalLinks","createdAt","updatedAt") VALUES (gen_random_uuid(),'operational-kpi-dashboard','عملیات','داشبورد KPI عملیاتی: از داده تا تصمیم','یک داشبورد متمرکز می‌تواند زمان تصمیم‌گیری را تا ۶۰٪ کاهش دهد.','## بینش اجرایی
داشبورد عملیاتی باید تصمیم‌ساز باشد، نه فقط نمایشی. تفاوت کلیدی: داشبورد نمایشی داده را نشان می‌دهد؛ داشبورد تصمیم‌ساز، «چه کار کنم» را پاسخ می‌دهد.

## داده‌ها
یک داشبورد متمرکز می‌تواند زمان تصمیم‌گیری را تا ۶۰٪ کاهش دهد چون مدیر وقتش را صرف جستجوی داده نمی‌کند.

## تحلیل
اصول: شروع با «چه چیزی نیاز به توجه دارد؟»، اولویت‌بندی بر شدت، و هر آیتم با اثر، علت و اقدام پیشنهادی.

## بینش هوش مصنوعی
داشبورد IndustryScope با ساختار «صبح بخیر. N مورد نیاز به توجه دارد» شروع می‌شود و هر آیتم را با اقدام قابل‌اجرا ارائه می‌دهد.

## اقدام پیشنهادی
1. داشبورد را با سؤال «چه چیزی نیاز به توجه دارد؟» طراحی کنید
2. هر آیتم را با اثر و اقدام پیوست کنید
3. اولویت را بر شدت بگذارید

## مطالعهٔ بیشتر
- [ScopeOS](https://scopeos.ir)
- [FinScope](https://finscope.ir)','۶۰٪','کاهش زمان تصمیم','-۶۰٪',5,true,'داشبورد KPI عملیاتی متمرکز، زمان تصمیم‌گیری را کاهش می‌دهد. روش طراحی داشبورد اجرایی مؤثر.','داشبورد KPI, عملیات, تصمیم‌گیری, داشبورد اجرایی, IndustryScope',NULL,'[{"label":"ScopeOS","url":"https://scopeos.ir"},{"label":"FinScope","url":"https://finscope.ir"}]',NOW(),NOW()) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Article" ("id","slug","category","title","insight","body","stat","statLabel","delta","readMins","published","metaDescription","keywords","ogImage","externalLinks","createdAt","updatedAt") VALUES (gen_random_uuid(),'root-cause-analysis-5why','عملیات','تحلیل علت ریشه‌ای ۵چرا: فراتر از علامت‌درمانی','تحلیل ۵چرا می‌تواند ۸۰٪ عود مشکلات را کاهش دهد.','## بینش اجرایی
وقتی مشکلی رخ می‌دهد، تندترین واکنش علامت‌درمانی است. اما بدون علت‌ریشه‌یابی، مشکل عود می‌کند. روش ۵چرا ابزار ساده‌ای برای کشف ریشه است.

## داده‌ها
تحلیل ۵چرا می‌تواند ۸۰٪ عود مشکلات را کاهش دهد چون به‌جای رفع علامت، ریشه را برطرف می‌کند.

## تحلیل
روش: پنج بار «چرا؟» پرسیده می‌شود. هر پاسخ، لایهٔ بعدی را باز می‌کند. معمولاً در لایهٔ پنجم، علت سیستمی کشف می‌شود.

## بینش هوش مصنوعی
IndustryScope برای هر هشدار، زمینهٔ علت بالقوه را ارائه می‌دهد و تیم را در تحلیل ۵چرا یاری می‌کند.

## اقدام پیشنهادی
1. به‌جای علامت، علت ریشه را پیدا کنید
2. پنج چرا را مستند کنید
3. راه‌حل را در سطح سیستمی پیاده کنید

## مطالعهٔ بیشتر
- [ScopeOS](https://scopeos.ir)
- [HealthScope](https://healthscope.ir)','۸۰٪','کاهش عود','-۸۰٪',5,true,'تحلیل علت ریشه‌ای با روش ۵چرا، عود مشکلات عملیاتی را کاهش می‌دهد. روش و مثال عملی.','تحلیل علت ریشه‌ای, ۵چرا, 5 why, بهبود عملیات, IndustryScope',NULL,'[{"label":"ScopeOS","url":"https://scopeos.ir"},{"label":"FinScope","url":"https://finscope.ir"}]',NOW(),NOW()) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Article" ("id","slug","category","title","insight","body","stat","statLabel","delta","readMins","published","metaDescription","keywords","ogImage","externalLinks","createdAt","updatedAt") VALUES (gen_random_uuid(),'continuous-improvement-kaizen','عملیات','بهبود پیوستهٔ کایزن: تغییرات کوچک، اثر بزرگ','برنامهٔ کایزن مستمر می‌تواند بهره‌وری را سالانه ۱۵٪ افزایش دهد.','## بینش اجرایی
کایزن به معنای «بهبود پیوسته» است — تغییرات کوچک و روزانه به‌جای تحولات بزرگ و پرخطر. اثر آن مرکب است.

## داده‌ها
برنامهٔ کایزن مستمر می‌تواند بهره‌وری را سالانه ۱۵٪ افزایش دهد — بدون سرمایه‌گذاری بزرگ.

## تحلیل
سه عنصر: مشارکت همهٔ کارکنان، تغییرات کوچک و اندازه‌شده، و حافظهٔ سازمانی برای جلوگیری از عود.

## بینش هوش مصنوعی
IndustryScope تغییرات عملیاتی را ثبت و اندازه می‌کند و اثر هر بهبود را برای تیم قابل‌مشاهده می‌سازد.

## اقدام پیشنهادی
1. تغییرات کوچک و اندازه‌شده ایجاد کنید
2. همهٔ کارکنان را مشارکت دهید
3. اثر هر بهبود را بسنجید

## مطالعهٔ بیشتر
- [ScopeOS](https://scopeos.ir)
- [FinScope](https://finscope.ir)','۱۵٪','افزایش سالانه','+۱۵٪',5,true,'فلسفهٔ کایزن (بهبود پیوسته) با تغییرات کوچک، بهره‌وری سالانه را افزایش می‌دهد. روش اجرا در محیط عملیاتی.','کایزن, بهبود پیوسته, kaizen, بهره‌وری, IndustryScope',NULL,'[{"label":"ScopeOS","url":"https://scopeos.ir"},{"label":"FinScope","url":"https://finscope.ir"}]',NOW(),NOW()) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Article" ("id","slug","category","title","insight","body","stat","statLabel","delta","readMins","published","metaDescription","keywords","ogImage","externalLinks","createdAt","updatedAt") VALUES (gen_random_uuid(),'industry-4-data-backbone','صنعت','ستون فقرات دادهٔ صنعت ۴.۰','بدون یک لایهٔ دادهٔ واحد، صنعت ۴.۰ به جزایر داده تبدیل می‌شود.','## بینش اجرایی
صنعت ۴.۰ بر داده استوار است، اما اغلب داده در جزایر پراکنده است: ERP، WMS، MES، IoT — هرکدام با فرمت و زمان‌بندی متفاوت.

## داده‌ها
بدون یک لایهٔ دادهٔ واحد، کارایی تحلیل تا ۴۰٪ کاهش می‌یابد چون تیم‌ها وقتشان را صرف هماهنگ‌سازی داده می‌کنند.

## تحلیل
راه‌حل: یک لایهٔ هوش عملیاتی که دادهٔ همهٔ منابع را نرمالایز، ترکیب و در یک مدل دامنهٔ مشترک ارائه می‌دهد.

## بینش هوش مصنوعی
IndustryScope این لایهٔ هوش را ارائه می‌دهد: مدل دامنهٔ نرمالایز، رجیستری ابزار هوش مصنوعی و داشبورد یکپارچه.

## اقدام پیشنهادی
1. دادهٔ منابع پراکنده را نرمالایز کنید
2. یک مدل دامنهٔ مشترک تعریف کنید
3. هوش مصنوعی را از طریق رجیستری کنترل‌شده بدهید

## مطالعهٔ بیشتر
- [ScopeOS](https://scopeos.ir)
- [FinScope](https://finscope.ir)','۴۰٪','کارایی دادهٔ پراکنده','+۴۰٪',6,true,'ستون فقرات دادهٔ یکپارچه برای صنعت ۴.۰، جزایر داده را حذف می‌کند. معماری لایهٔ هوش عملیاتی.','صنعت ۴, Industry 4.0, لایه داده, یکپارچگی, IndustryScope',NULL,'[{"label":"ScopeOS","url":"https://scopeos.ir"},{"label":"FinScope","url":"https://finscope.ir"}]',NOW(),NOW()) ON CONFLICT (slug) DO NOTHING;
INSERT INTO "Article" ("id","slug","category","title","insight","body","stat","statLabel","delta","readMins","published","metaDescription","keywords","ogImage","externalLinks","createdAt","updatedAt") VALUES (gen_random_uuid(),'digital-twin-readiness','صنعت','آمادگی همزن دیجیتال: از تصور به واقعیت','همزن دیجیتال متصل می‌تواند زمان شروع تولید را تا ۳۰٪ کاهش دهد.','## بینش اجرایی
همزن دیجیتال یک نسخهٔ مجازی از عملیات فیزیکی است که با دادهٔ زنده به‌روز می‌شود. اما بدون دادهٔ متصل، فقط یک تصویر سه‌بعدی زیباست.

## داده‌ها
همزن دیجیتال متصل می‌تواند زمان شروع تولید را تا ۳۰٪ کاهش دهد چون آزمایش «چه‌می‌شود-اگر» در فضای مجازی انجام می‌شود.

## تحلیل
پیش‌نیازها: مدل دامنهٔ غنی، دادهٔ لحظه‌ای از همهٔ منابع، و موتور شبیه‌سازی.

## بینش هوش مصنوعی
IndustryScope معماری همزن را آماده می‌کند: مدل دامنهٔ جهان صنعتی (تأسیسات، انبار، لجستیک، تأمین‌کننده) و لایهٔ دادهٔ زنده.

## اقدام پیشنهادی
1. دادهٔ زنده را از همهٔ منابع جمع کنید
2. مدل دامنهٔ جهان صنعتی را تعریف کنید
3. شبیه‌سازی «چه‌می‌شود-اگر» بسازید

## مطالعهٔ بیشتر
- [ScopeOS](https://scopeos.ir)
- [HealthScope](https://healthscope.ir)','۳۰٪','کاهش زمان شروع','-۳۰٪',6,true,'همزن دیجیتال (Digital Twin) متصل به دادهٔ زنده، زمان شروع تولید و هزینهٔ آزمایش را کاهش می‌دهد.','همزن دیجیتال, digital twin, شبیه‌سازی, IndustryScope',NULL,'[{"label":"ScopeOS","url":"https://scopeos.ir"},{"label":"FinScope","url":"https://finscope.ir"}]',NOW(),NOW()) ON CONFLICT (slug) DO NOTHING;
-- Seed testimonials
DELETE FROM "Testimonial";
INSERT INTO "Testimonial" ("id","name","role","company","quote","rating","avatar","published","createdAt") VALUES (gen_random_uuid(),'Mohammad Reza Karimi','Operations Director','Pars Industrial Group','IndustryScope در دو هفته به Briefing روزانهٔ عملیات ما تبدیل شد. یک اتمام موجودی را سه روز پیش از توقف خط تولید تشخیص دادیم.',5,NULL,true,NOW());
INSERT INTO "Testimonial" ("id","name","role","company","quote","rating","avatar","published","createdAt") VALUES (gen_random_uuid(),'Sara Mohseni','Supply Chain Manager','Gulf Distribution Co.','ماتریس ریسک بالاخره به من اجازه داد به هیئت‌مدیره نشان دهم چرا یک تصمیم تأمین‌کننده مهم بود — با عدد، نه حس.',5,NULL,true,NOW());
INSERT INTO "Testimonial" ("id","name","role","company","quote","rating","avatar","published","createdAt") VALUES (gen_random_uuid(),'Arman Tehrani','Warehouse Manager','Qom Logistics Hub','تشخیص موجودی راکد، هزینهٔ پایلوت را در همان فصل اول جبران کرد. دفتر جابجایی به‌تنهایی نگاه تیم به تعدیل‌ها را تغییر داد.',5,NULL,true,NOW());
