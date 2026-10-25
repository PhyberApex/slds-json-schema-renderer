## [1.5.73](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.72...v1.5.73) (2026-10-20)


### Bug Fixes

* **deps:** update dependency motion-v to v2.8.0 ([#339](https://github.com/PhyberApex/slds-json-schema-renderer/issues/339)) ([b4810ed](https://github.com/PhyberApex/slds-json-schema-renderer/commit/b4810edc09830005fae0e658d9feebdd8b7cfc64))

## [1.6.0](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.75...v1.6.0) (2026-10-24)


### Features

* **frontend:** make the applicator blocks collapsible, expanded at the root and collapsed when nested ([#407](https://github.com/PhyberApex/slds-json-schema-renderer/issues/407)) ([2897f96](https://github.com/PhyberApex/slds-json-schema-renderer/commit/2897f968fab57567d7cf522f0e92f7bdc108a795)), closes [#405](https://github.com/PhyberApex/slds-json-schema-renderer/issues/405)
* **frontend:** render not, if/then/else, dependencies, propertyNames and annotation keywords ([#396](https://github.com/PhyberApex/slds-json-schema-renderer/issues/396)) ([7031087](https://github.com/PhyberApex/slds-json-schema-renderer/commit/7031087ab93856d372f8bbf4e8956c057e288a44)), closes [#360](https://github.com/PhyberApex/slds-json-schema-renderer/issues/360)
* **frontend:** show format, default, examples, multipleOf, const and content keywords in the visual view ([#398](https://github.com/PhyberApex/slds-json-schema-renderer/issues/398)) ([d776050](https://github.com/PhyberApex/slds-json-schema-renderer/commit/d776050798a1bef5fb4677c2da9a0bc59e29a13b)), closes [#361](https://github.com/PhyberApex/slds-json-schema-renderer/issues/361)


### Bug Fixes

* **build:** emit the frontend bundle as bundle.js so nosniff hosts execute it ([#383](https://github.com/PhyberApex/slds-json-schema-renderer/issues/383)) ([2573734](https://github.com/PhyberApex/slds-json-schema-renderer/commit/2573734a55e9d9f905851edc82dadfbe544df002)), closes [#371](https://github.com/PhyberApex/slds-json-schema-renderer/issues/371)
* **cli:** exit non-zero when nothing was parsed and summarise skipped files, with --fail-on-skip ([#404](https://github.com/PhyberApex/slds-json-schema-renderer/issues/404)) ([0ffdac2](https://github.com/PhyberApex/slds-json-schema-renderer/commit/0ffdac23aefeed870a302b0b6366937c14f12ae8)), closes [#387](https://github.com/PhyberApex/slds-json-schema-renderer/issues/387)
* **deps:** update dependency @salesforce-ux/design-system to v2.264.2 ([#408](https://github.com/PhyberApex/slds-json-schema-renderer/issues/408)) ([be98782](https://github.com/PhyberApex/slds-json-schema-renderer/commit/be98782967c3ac77cc9967f6e8fc771851081dc7))
* **frontend:** bind the schema heading tooltip instead of rendering a literal mustache ([#400](https://github.com/PhyberApex/slds-json-schema-renderer/issues/400)) ([36a2ed1](https://github.com/PhyberApex/slds-json-schema-renderer/commit/36a2ed134f68956a4d8c9eb130074eff49c0b337)), closes [#367](https://github.com/PhyberApex/slds-json-schema-renderer/issues/367)
* **frontend:** colour the composition badge from the computed composition type ([#393](https://github.com/PhyberApex/slds-json-schema-renderer/issues/393)) ([467fc62](https://github.com/PhyberApex/slds-json-schema-renderer/commit/467fc62993fb25f8bb7619290343839c1aaf0098)), closes [#365](https://github.com/PhyberApex/slds-json-schema-renderer/issues/365)
* **frontend:** derive the sidebar active state from the selected schema's file path ([#399](https://github.com/PhyberApex/slds-json-schema-renderer/issues/399)) ([41de467](https://github.com/PhyberApex/slds-json-schema-renderer/commit/41de467b968ec517e6e3719fce844ed45bab3c0d)), closes [#363](https://github.com/PhyberApex/slds-json-schema-renderer/issues/363)
* **frontend:** format enum and const literals so null and the empty string are visible ([#397](https://github.com/PhyberApex/slds-json-schema-renderer/issues/397)) ([e2e434d](https://github.com/PhyberApex/slds-json-schema-renderer/commit/e2e434d6c0cec5cede306c021d4b9498861bc413)), closes [#362](https://github.com/PhyberApex/slds-json-schema-renderer/issues/362)
* **frontend:** infer object, array, string and number types from structural keywords when type is absent ([#392](https://github.com/PhyberApex/slds-json-schema-renderer/issues/392)) ([17a17d8](https://github.com/PhyberApex/slds-json-schema-renderer/commit/17a17d86c3fef348dfa6fe66344304ffe4c7ab6e)), closes [#358](https://github.com/PhyberApex/slds-json-schema-renderer/issues/358)
* **frontend:** make the tabs accessible with unique ids, bound aria state and keyboard navigation ([#401](https://github.com/PhyberApex/slds-json-schema-renderer/issues/401)) ([699b2e5](https://github.com/PhyberApex/slds-json-schema-renderer/commit/699b2e5706d1a94e21ba765ef6e5faa0f58583c2))
* **frontend:** render base keywords next to composition and one section per anyOf/oneOf/allOf ([#395](https://github.com/PhyberApex/slds-json-schema-renderer/issues/395)) ([ff3416d](https://github.com/PhyberApex/slds-json-schema-renderer/commit/ff3416d1c3c61cef194939f10d31779929e625f6)), closes [#359](https://github.com/PhyberApex/slds-json-schema-renderer/issues/359)
* **frontend:** render boolean subschemas instead of crashing the surrounding component ([#390](https://github.com/PhyberApex/slds-json-schema-renderer/issues/390)) ([4f299e1](https://github.com/PhyberApex/slds-json-schema-renderer/commit/4f299e10347949b8a4392edbac7a8d88adabd697)), closes [#356](https://github.com/PhyberApex/slds-json-schema-renderer/issues/356)
* **frontend:** render type arrays such as ["string", "null"] with a readable label and a nullable badge ([#391](https://github.com/PhyberApex/slds-json-schema-renderer/issues/391)) ([2948b07](https://github.com/PhyberApex/slds-json-schema-renderer/commit/2948b072061d1b681a2c7651fefe365e01201c04)), closes [#357](https://github.com/PhyberApex/slds-json-schema-renderer/issues/357)
* **frontend:** stop CompositionSchema from writing inferred types into the sub-schemas ([#394](https://github.com/PhyberApex/slds-json-schema-renderer/issues/394)) ([89ffdac](https://github.com/PhyberApex/slds-json-schema-renderer/commit/89ffdacd83a802a6787f790489a50bb3a6822ab5)), closes [#366](https://github.com/PhyberApex/slds-json-schema-renderer/issues/366)
* **generator:** apply --title and --description to the HTML title and meta description ([#382](https://github.com/PhyberApex/slds-json-schema-renderer/issues/382)) ([60aef12](https://github.com/PhyberApex/slds-json-schema-renderer/commit/60aef12cc695b34b85b10b413b028c2f9160aa32)), closes [#368](https://github.com/PhyberApex/slds-json-schema-renderer/issues/368)
* **generator:** fail with a non-zero exit when the frontend bundle is missing ([#381](https://github.com/PhyberApex/slds-json-schema-renderer/issues/381)) ([818e320](https://github.com/PhyberApex/slds-json-schema-renderer/commit/818e320acc133c394b04a2a482243f8fb7a824e8)), closes [#370](https://github.com/PhyberApex/slds-json-schema-renderer/issues/370)
* **generator:** insert embedded schema data with a replacer so $ patterns are kept verbatim ([#379](https://github.com/PhyberApex/slds-json-schema-renderer/issues/379)) ([6c50355](https://github.com/PhyberApex/slds-json-schema-renderer/commit/6c50355812507e9ba33fb93d32c3e1f48aaba346)), closes [#351](https://github.com/PhyberApex/slds-json-schema-renderer/issues/351)
* **parser:** keep circular $refs as markers so recursive schemas no longer abort the run ([#389](https://github.com/PhyberApex/slds-json-schema-renderer/issues/389)) ([41bb380](https://github.com/PhyberApex/slds-json-schema-renderer/commit/41bb380546c8f1a4bd1251af2f04be07e662d5e4)), closes [#352](https://github.com/PhyberApex/slds-json-schema-renderer/issues/352)
* **parser:** reject non-object JSON documents with a clear message instead of treating them as schemas ([#388](https://github.com/PhyberApex/slds-json-schema-renderer/issues/388)) ([d0d6ece](https://github.com/PhyberApex/slds-json-schema-renderer/commit/d0d6ece71171c3113914639e7f3d1aaff1275d24)), closes [#354](https://github.com/PhyberApex/slds-json-schema-renderer/issues/354)
* **parser:** resolve relative $refs from the schema path instead of changing the process cwd ([#385](https://github.com/PhyberApex/slds-json-schema-renderer/issues/385)) ([41eb468](https://github.com/PhyberApex/slds-json-schema-renderer/commit/41eb4682a878c32765b58579eee27f0abe79e488)), closes [#375](https://github.com/PhyberApex/slds-json-schema-renderer/issues/375)
* **parser:** validate schemas against their declared metaschema and add a --strict flag ([#386](https://github.com/PhyberApex/slds-json-schema-renderer/issues/386)) ([d9b85ae](https://github.com/PhyberApex/slds-json-schema-renderer/commit/d9b85ae6f1efa98998810bbc635802898830f067)), closes [#353](https://github.com/PhyberApex/slds-json-schema-renderer/issues/353)
* validate draft-04 schemas, accept top-level boolean schemas, show nullable badges on object and array headers, and tidy review findings ([#406](https://github.com/PhyberApex/slds-json-schema-renderer/issues/406)) ([9890169](https://github.com/PhyberApex/slds-json-schema-renderer/commit/9890169c46eba04fa320f662cef90b67f3f93911))

## [1.5.75](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.74...v1.5.75) (2026-10-21)


### Bug Fixes

* **build:** define process.env.NODE_ENV so the Vite 8 bundle does not reference process at runtime ([#376](https://github.com/PhyberApex/slds-json-schema-renderer/issues/376)) ([d2cec37](https://github.com/PhyberApex/slds-json-schema-renderer/commit/d2cec37f10b7425f4b7e6cf62fb34930d801a2ae)), closes [#349](https://github.com/PhyberApex/slds-json-schema-renderer/issues/349)

## [1.5.74](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.73...v1.5.74) (2026-10-21)


### Bug Fixes

* **generator:** escape embedded schema data so a &lt;/script&gt; in a schema cannot break the page ([#345](https://github.com/PhyberApex/slds-json-schema-renderer/issues/345)) ([4d4a0df](https://github.com/PhyberApex/slds-json-schema-renderer/commit/4d4a0dfd72888e2caed0931091f0f23cb10fd5f4))

## [1.5.72](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.71...v1.5.72) (2026-10-16)


### Bug Fixes

* **deps:** update dependency motion-v to v2.7.0 ([#337](https://github.com/PhyberApex/slds-json-schema-renderer/issues/337)) ([590dd8f](https://github.com/PhyberApex/slds-json-schema-renderer/commit/590dd8fb1964e23da0e2a218365a4603a3383f82))

## [1.5.71](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.70...v1.5.71) (2026-10-15)


### Bug Fixes

* **deps:** update dependency @apidevtools/json-schema-ref-parser to v16.0.5 ([#336](https://github.com/PhyberApex/slds-json-schema-renderer/issues/336)) ([6408f4e](https://github.com/PhyberApex/slds-json-schema-renderer/commit/6408f4ee15875051630114f59cd7c38df67866bc))

## [1.5.70](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.69...v1.5.70) (2026-10-09)


### Bug Fixes

* **deps:** update dependency motion-v to v2.6.0 ([#332](https://github.com/PhyberApex/slds-json-schema-renderer/issues/332)) ([a0bfcc1](https://github.com/PhyberApex/slds-json-schema-renderer/commit/a0bfcc1a183c9bc086b18854db289a44d6968d53))

## [1.5.69](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.68...v1.5.69) (2026-10-06)


### Bug Fixes

* **deps:** update dependency motion-v to v2.5.2 ([#330](https://github.com/PhyberApex/slds-json-schema-renderer/issues/330)) ([00c3360](https://github.com/PhyberApex/slds-json-schema-renderer/commit/00c3360cc1aee7fb064b00fe41ab6bc390fbb2d2))

## [1.5.68](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.67...v1.5.68) (2026-10-01)


### Bug Fixes

* **deps:** update dependency motion-v to v2.5.1 ([#329](https://github.com/PhyberApex/slds-json-schema-renderer/issues/329)) ([55a98f9](https://github.com/PhyberApex/slds-json-schema-renderer/commit/55a98f992323f4877a34dbba51cac71f9b5acfc5))

## [1.5.67](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.66...v1.5.67) (2026-09-30)


### Bug Fixes

* **deps:** update dependency chalk to v6.0.1 ([#328](https://github.com/PhyberApex/slds-json-schema-renderer/issues/328)) ([c035956](https://github.com/PhyberApex/slds-json-schema-renderer/commit/c0359564b0fb71b60f9e052d73baf60d37a92541))

## [1.5.66](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.65...v1.5.66) (2026-09-27)


### Bug Fixes

* **deps:** update dependency fs-extra to v11.4.1 ([#326](https://github.com/PhyberApex/slds-json-schema-renderer/issues/326)) ([3f90ab5](https://github.com/PhyberApex/slds-json-schema-renderer/commit/3f90ab5b98921278c3f0bf49d700d0b00d94b967))

## [1.5.65](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.64...v1.5.65) (2026-09-24)


### Bug Fixes

* **deps:** update dependency @apidevtools/json-schema-ref-parser to v16.0.3 ([#324](https://github.com/PhyberApex/slds-json-schema-renderer/issues/324)) ([22617db](https://github.com/PhyberApex/slds-json-schema-renderer/commit/22617dbdbed6f6e9a29fac4967b5942ce6a32a5c))

## [1.5.64](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.63...v1.5.64) (2026-09-21)


### Bug Fixes

* **deps:** update dependency motion-v to v2.4.4 ([#320](https://github.com/PhyberApex/slds-json-schema-renderer/issues/320)) ([67ca325](https://github.com/PhyberApex/slds-json-schema-renderer/commit/67ca32576a274bcbfa72a1d4627fc000c1515cca))

## [1.5.63](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.62...v1.5.63) (2026-09-10)


### Bug Fixes

* **deps:** update dependency @apidevtools/json-schema-ref-parser to v16.0.2 ([#316](https://github.com/PhyberApex/slds-json-schema-renderer/issues/316)) ([8b8a8b1](https://github.com/PhyberApex/slds-json-schema-renderer/commit/8b8a8b1c9bb419b3968bb4129bbdd9446430046f))

## [1.5.62](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.61...v1.5.62) (2026-09-09)


### Bug Fixes

* **deps:** update dependency motion-v to v2.4.2 ([#315](https://github.com/PhyberApex/slds-json-schema-renderer/issues/315)) ([3fbbde1](https://github.com/PhyberApex/slds-json-schema-renderer/commit/3fbbde12a5ddd196096b281fe4480dda1689c369))

## [1.5.61](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.60...v1.5.61) (2026-09-07)


### Bug Fixes

* **deps:** update dependency @salesforce-ux/design-system to v2.264.1 ([#311](https://github.com/PhyberApex/slds-json-schema-renderer/issues/311)) ([43e8285](https://github.com/PhyberApex/slds-json-schema-renderer/commit/43e82855af7b6330c6dfeccddcc11f8c448eff13))
* **deps:** update dependency motion-v to v2.4.1 ([#312](https://github.com/PhyberApex/slds-json-schema-renderer/issues/312)) ([203b6ca](https://github.com/PhyberApex/slds-json-schema-renderer/commit/203b6ca3270df3813fbc8b3cd35be8a3998df5b3))

## [1.5.60](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.59...v1.5.60) (2026-09-03)


### Bug Fixes

* **deps:** update dependency @apidevtools/json-schema-ref-parser to v16.0.1 ([#306](https://github.com/PhyberApex/slds-json-schema-renderer/issues/306)) ([b85f7d5](https://github.com/PhyberApex/slds-json-schema-renderer/commit/b85f7d56cac2fb3ff29ea6f0859c6b572daffd54))

## [1.5.59](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.58...v1.5.59) (2026-08-19)


### Bug Fixes

* **deps:** update dependency motion-v to v2.4.0 ([#303](https://github.com/PhyberApex/slds-json-schema-renderer/issues/303)) ([35d93b1](https://github.com/PhyberApex/slds-json-schema-renderer/commit/35d93b1f05c06b0b2858e062edcc3f3d93944d79))

## [1.5.58](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.57...v1.5.58) (2026-08-17)


### Bug Fixes

* **deps:** update dependency @apidevtools/json-schema-ref-parser to v16 ([#302](https://github.com/PhyberApex/slds-json-schema-renderer/issues/302)) ([64c520c](https://github.com/PhyberApex/slds-json-schema-renderer/commit/64c520c9b3ab896b16a245eee0029b1fb0f2bd93))

## [1.5.57](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.56...v1.5.57) (2026-08-17)


### Bug Fixes

* **deps:** update dependency @apidevtools/json-schema-ref-parser to v15.5.2 ([#301](https://github.com/PhyberApex/slds-json-schema-renderer/issues/301)) ([1140a3e](https://github.com/PhyberApex/slds-json-schema-renderer/commit/1140a3edc5035e91e27291fc779dbb44ea15cbb1))

## [1.5.56](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.55...v1.5.56) (2026-08-03)


### Bug Fixes

* **deps:** update dependency @apidevtools/json-schema-ref-parser to v15.5.1 ([#295](https://github.com/PhyberApex/slds-json-schema-renderer/issues/295)) ([f18f953](https://github.com/PhyberApex/slds-json-schema-renderer/commit/f18f9531cbef3584c598be02d8791414b7133c35))

## [1.5.55](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.54...v1.5.55) (2026-07-26)


### Bug Fixes

* **deps:** update dependency chalk to v6 ([#294](https://github.com/PhyberApex/slds-json-schema-renderer/issues/294)) ([a9c3e4f](https://github.com/PhyberApex/slds-json-schema-renderer/commit/a9c3e4f5d3772ef940994e05b9004bf683811593))

## [1.5.54](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.53...v1.5.54) (2026-07-26)


### Bug Fixes

* **deps:** update dependency @salesforce-ux/design-system to v2.264.0 ([#291](https://github.com/PhyberApex/slds-json-schema-renderer/issues/291)) ([225fac6](https://github.com/PhyberApex/slds-json-schema-renderer/commit/225fac64daf45c7ed46d056f1760dc39fd38a93c))
* **deps:** update dependency fs-extra to v11.4.0 ([#292](https://github.com/PhyberApex/slds-json-schema-renderer/issues/292)) ([16507ff](https://github.com/PhyberApex/slds-json-schema-renderer/commit/16507ff50f09d55f823c5c0393ad8955c784d5ef))

## [1.5.53](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.52...v1.5.53) (2026-07-10)


### Bug Fixes

* **deps:** update dependency @apidevtools/json-schema-ref-parser to v15.5.0 ([#276](https://github.com/PhyberApex/slds-json-schema-renderer/issues/276)) ([f3601bb](https://github.com/PhyberApex/slds-json-schema-renderer/commit/f3601bb3749c02b435b21a87822e1204ab92d293))

## [1.5.52](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.51...v1.5.52) (2026-07-01)


### Bug Fixes

* **deps:** update dependency @salesforce-ux/design-system to v2.30.7 ([#272](https://github.com/PhyberApex/slds-json-schema-renderer/issues/272)) ([660e103](https://github.com/PhyberApex/slds-json-schema-renderer/commit/660e1030c04fa04b5cf080231506ed29e6880a19))
* **deps:** update dependency fs-extra to v11.3.6 ([#274](https://github.com/PhyberApex/slds-json-schema-renderer/issues/274)) ([ec4dbc5](https://github.com/PhyberApex/slds-json-schema-renderer/commit/ec4dbc508c3a1a477035ca01f316d705fc82ed95))

## [1.5.51](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.50...v1.5.51) (2026-06-22)


### Bug Fixes

* **deps:** update dependency @apidevtools/json-schema-ref-parser to v15.4.0 ([#265](https://github.com/PhyberApex/slds-json-schema-renderer/issues/265)) ([0ecf088](https://github.com/PhyberApex/slds-json-schema-renderer/commit/0ecf0889981595087271d9097370c3546e3feff8))

## [1.5.50](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.49...v1.5.50) (2026-06-15)


### Bug Fixes

* **deps:** update dependency @apidevtools/json-schema-ref-parser to v15.3.6 ([#258](https://github.com/PhyberApex/slds-json-schema-renderer/issues/258)) ([8831973](https://github.com/PhyberApex/slds-json-schema-renderer/commit/8831973c91241a3d94331c5a82a194ad2dcf48fe))

## [1.5.49](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.48...v1.5.49) (2026-06-10)


### Bug Fixes

* **deps:** update dependency motion-v to v2.3.0 ([#254](https://github.com/PhyberApex/slds-json-schema-renderer/issues/254)) ([0a28baa](https://github.com/PhyberApex/slds-json-schema-renderer/commit/0a28baa40c1ec8e4f697f10d4fea4d05137eb768))

## [1.5.48](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.47...v1.5.48) (2026-05-31)


### Bug Fixes

* **deps:** update dependency commander to v15 ([#250](https://github.com/PhyberApex/slds-json-schema-renderer/issues/250)) ([fc3ffb6](https://github.com/PhyberApex/slds-json-schema-renderer/commit/fc3ffb6f75f7b62c3132b946f1860c3bd55ecd71))

## [1.5.47](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.46...v1.5.47) (2026-05-28)


### Bug Fixes

* **deps:** update dependency @salesforce-ux/design-system to v2.30.4 ([#248](https://github.com/PhyberApex/slds-json-schema-renderer/issues/248)) ([e81620a](https://github.com/PhyberApex/slds-json-schema-renderer/commit/e81620ae3eba845d3de701d357b7e35d0057ecf0))

## [1.5.46](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.45...v1.5.46) (2026-05-07)


### Bug Fixes

* **deps:** update dependency fs-extra to v11.3.5 ([#235](https://github.com/PhyberApex/slds-json-schema-renderer/issues/235)) ([5a3dbb6](https://github.com/PhyberApex/slds-json-schema-renderer/commit/5a3dbb6c585109de2bd859363d8fd4ea9b83f5cb))

## [1.5.45](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.44...v1.5.45) (2026-04-25)


### Bug Fixes

* **deps:** update dependency ajv to v8.20.0 ([#229](https://github.com/PhyberApex/slds-json-schema-renderer/issues/229)) ([4d1c195](https://github.com/PhyberApex/slds-json-schema-renderer/commit/4d1c195d5ce945467a363e5252b38c36f6c25f45))

## [1.5.44](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.43...v1.5.44) (2026-04-24)


### Bug Fixes

* **deps:** update dependency @salesforce-ux/design-system to v2.29.2 ([#228](https://github.com/PhyberApex/slds-json-schema-renderer/issues/228)) ([5714c31](https://github.com/PhyberApex/slds-json-schema-renderer/commit/5714c3136105a217c4c510f73a19ec9d18a05e8c))

## [1.5.43](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.42...v1.5.43) (2026-04-14)


### Bug Fixes

* **deps:** update dependency motion-v to v2.2.1 ([#223](https://github.com/PhyberApex/slds-json-schema-renderer/issues/223)) ([a01e488](https://github.com/PhyberApex/slds-json-schema-renderer/commit/a01e48834f28918c52f2b08d49187ee4eef86036))

## [1.5.42](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.41...v1.5.42) (2026-04-01)


### Bug Fixes

* **deps:** update dependency @salesforce-ux/design-system to v2.29.1 ([#218](https://github.com/PhyberApex/slds-json-schema-renderer/issues/218)) ([62105d0](https://github.com/PhyberApex/slds-json-schema-renderer/commit/62105d0e872f16a7343ef407df999b6f1b77484a))

## [1.5.41](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.40...v1.5.41) (2026-03-31)


### Bug Fixes

* **deps:** update dependency @apidevtools/json-schema-ref-parser to v15.3.5 ([#215](https://github.com/PhyberApex/slds-json-schema-renderer/issues/215)) ([3fe7616](https://github.com/PhyberApex/slds-json-schema-renderer/commit/3fe761654297e66fbd0026a54d845d02ff38a7e6))

## [1.5.40](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.39...v1.5.40) (2026-03-26)


### Bug Fixes

* **deps:** update dependency @apidevtools/json-schema-ref-parser to v15.3.3 ([#214](https://github.com/PhyberApex/slds-json-schema-renderer/issues/214)) ([b4cc281](https://github.com/PhyberApex/slds-json-schema-renderer/commit/b4cc2814bbdb38c2c77909a99a04477581206e76))

## [1.5.39](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.38...v1.5.39) (2026-03-26)


### Bug Fixes

* **deps:** update dependency @apidevtools/json-schema-ref-parser to v15.3.2 ([#211](https://github.com/PhyberApex/slds-json-schema-renderer/issues/211)) ([c0498c6](https://github.com/PhyberApex/slds-json-schema-renderer/commit/c0498c6ab172aa8a49a0240c822d2caf35b8cc47))
* **deps:** update dependency motion-v to v2.2.0 ([#209](https://github.com/PhyberApex/slds-json-schema-renderer/issues/209)) ([3c27384](https://github.com/PhyberApex/slds-json-schema-renderer/commit/3c27384046ed7ca11fd52b9c6ef97688b21815fd))

## [1.5.38](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.37...v1.5.38) (2026-03-22)


### Bug Fixes

* **deps:** update dependency motion-v to v2.1.0 ([#208](https://github.com/PhyberApex/slds-json-schema-renderer/issues/208)) ([321c7cf](https://github.com/PhyberApex/slds-json-schema-renderer/commit/321c7cff16525aab128b1ec37fc9570f2efde706))

## [1.5.37](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.36...v1.5.37) (2026-03-15)


### Bug Fixes

* **deps:** update dependency motion-v to v2.0.1 ([#205](https://github.com/PhyberApex/slds-json-schema-renderer/issues/205)) ([62527f9](https://github.com/PhyberApex/slds-json-schema-renderer/commit/62527f9c7ccedc67dd265f623e6ef313d25d7825))

## [1.5.36](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.35...v1.5.36) (2026-03-06)


### Bug Fixes

* **deps:** update dependency fs-extra to v11.3.4 ([#197](https://github.com/PhyberApex/slds-json-schema-renderer/issues/197)) ([ed2c5ee](https://github.com/PhyberApex/slds-json-schema-renderer/commit/ed2c5eea890595d20280fc789b4460623b555350))

## [1.5.35](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.34...v1.5.35) (2026-03-01)


### Bug Fixes

* **deps:** update dependency @apidevtools/json-schema-ref-parser to v15.3.1 ([#193](https://github.com/PhyberApex/slds-json-schema-renderer/issues/193)) ([667fc22](https://github.com/PhyberApex/slds-json-schema-renderer/commit/667fc22916ae57642a46abe76a367f33ae00606f))

## [1.5.34](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.33...v1.5.34) (2026-02-25)


### Bug Fixes

* **deps:** update dependency motion-v to v2 ([#191](https://github.com/PhyberApex/slds-json-schema-renderer/issues/191)) ([3ade52b](https://github.com/PhyberApex/slds-json-schema-renderer/commit/3ade52b69087cb998aa7147ff12663bdc33e4072))

## [1.5.33](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.32...v1.5.33) (2026-02-20)


### Bug Fixes

* **deps:** update dependency glob to v13.0.6 ([#186](https://github.com/PhyberApex/slds-json-schema-renderer/issues/186)) ([a96c603](https://github.com/PhyberApex/slds-json-schema-renderer/commit/a96c60311c297bcf67ac511264556f330569b373))

## [1.5.32](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.31...v1.5.32) (2026-02-18)


### Bug Fixes

* **deps:** update dependency glob to v13.0.5 ([#185](https://github.com/PhyberApex/slds-json-schema-renderer/issues/185)) ([d34fe06](https://github.com/PhyberApex/slds-json-schema-renderer/commit/d34fe067b7fa013e5342055ef031fdac6e81eb83))

## [1.5.31](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.30...v1.5.31) (2026-02-17)


### Bug Fixes

* **deps:** update dependency glob to v13.0.4 ([#184](https://github.com/PhyberApex/slds-json-schema-renderer/issues/184)) ([3c4d55f](https://github.com/PhyberApex/slds-json-schema-renderer/commit/3c4d55ff37dffaf18318f2e030e29df1ac82174d))

## [1.5.30](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.29...v1.5.30) (2026-02-15)


### Bug Fixes

* **deps:** update dependency ajv to v8.18.0 ([#181](https://github.com/PhyberApex/slds-json-schema-renderer/issues/181)) ([d5d8ec7](https://github.com/PhyberApex/slds-json-schema-renderer/commit/d5d8ec764c51b7b28381f40c2ffafec034f6768e))

## [1.5.29](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.28...v1.5.29) (2026-02-15)


### Bug Fixes

* **deps:** update dependency glob to v13.0.3 ([#180](https://github.com/PhyberApex/slds-json-schema-renderer/issues/180)) ([4ba4384](https://github.com/PhyberApex/slds-json-schema-renderer/commit/4ba4384a32c9559942add72a0b00a615972b922b))

## [1.5.28](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.27...v1.5.28) (2026-02-12)


### Bug Fixes

* **deps:** update dependency glob to v13.0.2 ([#177](https://github.com/PhyberApex/slds-json-schema-renderer/issues/177)) ([4f75bd7](https://github.com/PhyberApex/slds-json-schema-renderer/commit/4f75bd746c954d55c974defc9f3d38422756ea1a))

## [1.5.27](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.26...v1.5.27) (2026-02-10)


### Bug Fixes

* **deps:** update dependency motion-v to v1.10.3 ([#175](https://github.com/PhyberApex/slds-json-schema-renderer/issues/175)) ([4739add](https://github.com/PhyberApex/slds-json-schema-renderer/commit/4739add45ba19f3d48d9c751b5d80703ec11978d))

## [1.5.26](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.25...v1.5.26) (2026-02-04)


### Bug Fixes

* **deps:** update dependency glob to v13.0.1 ([#169](https://github.com/PhyberApex/slds-json-schema-renderer/issues/169)) ([2ed4b06](https://github.com/PhyberApex/slds-json-schema-renderer/commit/2ed4b064c1c90329522ce0540e9b809fe6675f97))

## [1.5.25](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.24...v1.5.25) (2026-01-26)


### Bug Fixes

* **deps:** update dependency @apidevtools/json-schema-ref-parser to v15.2.2 ([#163](https://github.com/PhyberApex/slds-json-schema-renderer/issues/163)) ([a335ad4](https://github.com/PhyberApex/slds-json-schema-renderer/commit/a335ad4419030bd3eb9d7ab7f1b8875aeacafa1f))
* **deps:** update dependency motion-v to v1.10.2 ([#164](https://github.com/PhyberApex/slds-json-schema-renderer/issues/164)) ([953c80f](https://github.com/PhyberApex/slds-json-schema-renderer/commit/953c80fd421d84ff586804886b72a6b2024ce928))

## [1.5.24](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.23...v1.5.24) (2026-01-18)


### Bug Fixes

* **deps:** update dependency @apidevtools/json-schema-ref-parser to v15.2.1 ([#159](https://github.com/PhyberApex/slds-json-schema-renderer/issues/159)) ([6366c22](https://github.com/PhyberApex/slds-json-schema-renderer/commit/6366c22752644c0ff4aa4284ccb5c39bba397bfe))

## [1.5.23](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.22...v1.5.23) (2026-01-15)


### Bug Fixes

* **deps:** update dependency @apidevtools/json-schema-ref-parser to v15.2.0 ([#158](https://github.com/PhyberApex/slds-json-schema-renderer/issues/158)) ([bf21040](https://github.com/PhyberApex/slds-json-schema-renderer/commit/bf21040b3db9380c8e7d7e52b472f856b261db4f))

## [1.5.22](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.21...v1.5.22) (2026-01-14)


### Bug Fixes

* **deps:** update dependency motion-v to v1.9.0 ([#155](https://github.com/PhyberApex/slds-json-schema-renderer/issues/155)) ([b96f5fe](https://github.com/PhyberApex/slds-json-schema-renderer/commit/b96f5fe6034c639cf095f55cd93405a5aa0a2f3b))

## [1.5.21](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.20...v1.5.21) (2026-01-13)


### Bug Fixes

* **deps:** update dependency @salesforce-ux/design-system to v2.29.0 ([#153](https://github.com/PhyberApex/slds-json-schema-renderer/issues/153)) ([faf074d](https://github.com/PhyberApex/slds-json-schema-renderer/commit/faf074d84f9b4b2d477bf2ee1121e82f3e246a9d))

## [1.5.20](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.19...v1.5.20) (2026-01-12)


### Bug Fixes

* **deps:** update dependency motion-v to v1.8.1 ([#151](https://github.com/PhyberApex/slds-json-schema-renderer/issues/151)) ([b2f7438](https://github.com/PhyberApex/slds-json-schema-renderer/commit/b2f7438642ff7c628b72a46f1aa251395e889931))

## [1.5.19](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.18...v1.5.19) (2026-01-07)


### Bug Fixes

* **deps:** update dependency motion-v to v1.7.6 ([#149](https://github.com/PhyberApex/slds-json-schema-renderer/issues/149)) ([95465ce](https://github.com/PhyberApex/slds-json-schema-renderer/commit/95465ce69f462fa594994e2531ec7410576a8a2d))

## [1.5.18](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.17...v1.5.18) (2026-01-02)


### Bug Fixes

* **deps:** update dependency fs-extra to v11.3.3 ([#147](https://github.com/PhyberApex/slds-json-schema-renderer/issues/147)) ([9dd7c8b](https://github.com/PhyberApex/slds-json-schema-renderer/commit/9dd7c8b43e71ebe0abb3f2c514b8b5e10e9434bc))
* **deps:** update dependency motion-v to v1.7.5 ([#148](https://github.com/PhyberApex/slds-json-schema-renderer/issues/148)) ([c6d7ce6](https://github.com/PhyberApex/slds-json-schema-renderer/commit/c6d7ce6c001eb2076b265c5278dde3f1c243ada7))

## [1.5.17](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.16...v1.5.17) (2025-12-02)


### Bug Fixes

* **deps:** update dependency @apidevtools/json-schema-ref-parser to v15.1.3 ([#135](https://github.com/PhyberApex/slds-json-schema-renderer/issues/135)) ([6bd5e2f](https://github.com/PhyberApex/slds-json-schema-renderer/commit/6bd5e2f1b10427f977284d170d45c0b3c26ec7b9))

## [1.5.16](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.15...v1.5.16) (2025-11-21)


### Bug Fixes

* **deps:** update dependency @apidevtools/json-schema-ref-parser to v15.1.2 ([#124](https://github.com/PhyberApex/slds-json-schema-renderer/issues/124)) ([3c5bbaa](https://github.com/PhyberApex/slds-json-schema-renderer/commit/3c5bbaa54c2abb94950b1b7abb126b98f91406a8))
* **deps:** update dependency glob to v13 ([#130](https://github.com/PhyberApex/slds-json-schema-renderer/issues/130)) ([09d1cee](https://github.com/PhyberApex/slds-json-schema-renderer/commit/09d1cee1b893ea9eb40bdce1694de857eaf798c8))

## [1.5.15](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.14...v1.5.15) (2025-11-14)


### Bug Fixes

* **deps:** update dependency @apidevtools/json-schema-ref-parser to v15 ([#122](https://github.com/PhyberApex/slds-json-schema-renderer/issues/122)) ([8877e4a](https://github.com/PhyberApex/slds-json-schema-renderer/commit/8877e4ac72f2597b57726324f870f5f154a87d05))

## [1.5.14](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.13...v1.5.14) (2025-10-29)


### Bug Fixes

* **deps:** update dependency @salesforce-ux/design-system to v2.28.1 ([#112](https://github.com/PhyberApex/slds-json-schema-renderer/issues/112)) ([c65aaf6](https://github.com/PhyberApex/slds-json-schema-renderer/commit/c65aaf6c1378c4dd10d034b022c6acac3aab5bac))
* **deps:** update dependency motion-v to v1.7.4 ([#110](https://github.com/PhyberApex/slds-json-schema-renderer/issues/110)) ([95bfe61](https://github.com/PhyberApex/slds-json-schema-renderer/commit/95bfe6159f481472086a34089e5e68a0af74cc0e))

## [1.5.13](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.12...v1.5.13) (2025-10-01)


### Bug Fixes

* **deps:** update dependency motion-v to v1.7.2 ([#100](https://github.com/PhyberApex/slds-json-schema-renderer/issues/100)) ([aeb95df](https://github.com/PhyberApex/slds-json-schema-renderer/commit/aeb95df8d252323c341c3a086372ec5b79bdbb94))

## [1.5.12](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.11...v1.5.12) (2025-09-16)


### Bug Fixes

* **deps:** update dependency @apidevtools/json-schema-ref-parser to v14.2.1 ([#93](https://github.com/PhyberApex/slds-json-schema-renderer/issues/93)) ([a5a11d2](https://github.com/PhyberApex/slds-json-schema-renderer/commit/a5a11d2f102be402358f7f40b850c3fe8c7fd126))
* **deps:** update dependency fs-extra to v11.3.2 ([#94](https://github.com/PhyberApex/slds-json-schema-renderer/issues/94)) ([e9e11e4](https://github.com/PhyberApex/slds-json-schema-renderer/commit/e9e11e4ce2dd70fadb8cc26316603b369bb9a8ff))

## [1.5.11](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.10...v1.5.11) (2025-09-10)


### Bug Fixes

* **deps:** update dependency @salesforce-ux/design-system to v2.28.0 ([#67](https://github.com/PhyberApex/slds-json-schema-renderer/issues/67)) ([44efd6a](https://github.com/PhyberApex/slds-json-schema-renderer/commit/44efd6af475db19b6f93fda9c3a07c8af5804585))
* **deps:** update dependency chalk to v5.6.2 ([#86](https://github.com/PhyberApex/slds-json-schema-renderer/issues/86)) ([c363f4e](https://github.com/PhyberApex/slds-json-schema-renderer/commit/c363f4e68865f96ac354738486095b971f23f1c2))
* **deps:** update dependency fs-extra to v11.3.1 ([#85](https://github.com/PhyberApex/slds-json-schema-renderer/issues/85)) ([258be4f](https://github.com/PhyberApex/slds-json-schema-renderer/commit/258be4f1aaa56860aa65d0e8a512af4f2ced707f))

## [1.5.10](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.9...v1.5.10) (2025-09-09)


### Bug Fixes

* **deps:** update dependency @apidevtools/json-schema-ref-parser to v14.2.0 ([#77](https://github.com/PhyberApex/slds-json-schema-renderer/issues/77)) ([2fb51a2](https://github.com/PhyberApex/slds-json-schema-renderer/commit/2fb51a2fe7bddeff29b75a374e2d508a51aae152))
* **deps:** update dependency motion-v to v1.7.1 ([#75](https://github.com/PhyberApex/slds-json-schema-renderer/issues/75)) ([1b69cf6](https://github.com/PhyberApex/slds-json-schema-renderer/commit/1b69cf6b01de1527df2013e8e5dbaa849384d171))

## [1.5.9](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.8...v1.5.9) (2025-07-03)


### Bug Fixes

* **deps:** update dependency @apidevtools/json-schema-ref-parser to v14.0.3 ([#72](https://github.com/PhyberApex/slds-json-schema-renderer/issues/72)) ([d33ac14](https://github.com/PhyberApex/slds-json-schema-renderer/commit/d33ac141717a833c0de5d2c07991b9b6cc0ba88b))
* **deps:** update dependency motion-v to v1.4.0 ([#68](https://github.com/PhyberApex/slds-json-schema-renderer/issues/68)) ([73d992b](https://github.com/PhyberApex/slds-json-schema-renderer/commit/73d992b5286320384c8a47dcf53f9b0623b8028c))

## [1.5.8](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.7...v1.5.8) (2025-06-20)


### Bug Fixes

* **deps:** update dependency @apidevtools/json-schema-ref-parser to v14.0.2 ([#62](https://github.com/PhyberApex/slds-json-schema-renderer/issues/62)) ([4f70811](https://github.com/PhyberApex/slds-json-schema-renderer/commit/4f70811d387cd358d1b2fb7fba228b952b2805d2))
* **deps:** update dependency motion-v to v1.3.0 ([#61](https://github.com/PhyberApex/slds-json-schema-renderer/issues/61)) ([94aa8b8](https://github.com/PhyberApex/slds-json-schema-renderer/commit/94aa8b8dc78883b6373d111ed3d9b897e004d877))

## [1.5.7](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.6...v1.5.7) (2025-06-18)


### Bug Fixes

* **deps:** update dependency @apidevtools/json-schema-ref-parser to v14 ([#59](https://github.com/PhyberApex/slds-json-schema-renderer/issues/59)) ([f3abf8a](https://github.com/PhyberApex/slds-json-schema-renderer/commit/f3abf8ae6e5c34e67c4f2470a7063a8ef28729c6))

## [1.5.6](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.5...v1.5.6) (2025-06-15)


### Bug Fixes

* **deps:** update dependency glob to v11.0.3 ([#57](https://github.com/PhyberApex/slds-json-schema-renderer/issues/57)) ([0d18bd4](https://github.com/PhyberApex/slds-json-schema-renderer/commit/0d18bd4ca38392bd38b328449923aba9578c1fdc))

## [1.5.5](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.4...v1.5.5) (2025-06-10)


### Bug Fixes

* **deps:** update dependency @apidevtools/json-schema-ref-parser to v13.0.5 ([#54](https://github.com/PhyberApex/slds-json-schema-renderer/issues/54)) ([a77e53f](https://github.com/PhyberApex/slds-json-schema-renderer/commit/a77e53f792f0857a79acbf57e8ac3e35e2b866a8))

## [1.5.4](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.3...v1.5.4) (2025-06-10)


### Bug Fixes

* **deps:** update dependency @apidevtools/json-schema-ref-parser to v13.0.4 ([#52](https://github.com/PhyberApex/slds-json-schema-renderer/issues/52)) ([f370bef](https://github.com/PhyberApex/slds-json-schema-renderer/commit/f370befa719770f24179e1f3d29657f0bf92355f))
* **deps:** update dependency motion-v to v1.2.1 ([#53](https://github.com/PhyberApex/slds-json-schema-renderer/issues/53)) ([197459b](https://github.com/PhyberApex/slds-json-schema-renderer/commit/197459b95deca099d04d4c45474368b5161703f4))

## [1.5.3](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.2...v1.5.3) (2025-06-07)


### Bug Fixes

* **deps:** update dependency @apidevtools/json-schema-ref-parser to v13 ([#51](https://github.com/PhyberApex/slds-json-schema-renderer/issues/51)) ([1bcd067](https://github.com/PhyberApex/slds-json-schema-renderer/commit/1bcd0677ea2b8211c67ac9469d9e9b78e9b88b57))
* **deps:** update dependency motion-v to v1.2.0 ([#50](https://github.com/PhyberApex/slds-json-schema-renderer/issues/50)) ([d3e233c](https://github.com/PhyberApex/slds-json-schema-renderer/commit/d3e233ce004dbe8f0603a3c99c0a6ddfcbc9dccd))

## [1.5.2](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.1...v1.5.2) (2025-05-28)


### Bug Fixes

* **deps:** update dependency @apidevtools/json-schema-ref-parser to v12.0.2 ([#36](https://github.com/PhyberApex/slds-json-schema-renderer/issues/36)) ([800d18b](https://github.com/PhyberApex/slds-json-schema-renderer/commit/800d18b5e06a988fb422358abca01461a22fd00f))

## [1.5.1](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.5.0...v1.5.1) (2025-05-28)


### Bug Fixes

* **deps:** update dependency @salesforce-ux/design-system to v2.27.1 ([#37](https://github.com/PhyberApex/slds-json-schema-renderer/issues/37)) ([5f4f7f2](https://github.com/PhyberApex/slds-json-schema-renderer/commit/5f4f7f232b00c8c43fe5285b5bb6aa9640b45a5f))
* **deps:** update dependency motion-v to v1.1.1 ([#43](https://github.com/PhyberApex/slds-json-schema-renderer/issues/43)) ([1f43d02](https://github.com/PhyberApex/slds-json-schema-renderer/commit/1f43d026e19f8c5389ce47ef94739d5858721615))

# [1.5.0](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.4.1...v1.5.0) (2025-05-07)


### Features

* Include const as type and add some examples for const ([add7fe9](https://github.com/PhyberApex/slds-json-schema-renderer/commit/add7fe92505e0b0d602a509f45d95870181d4c50))

## [1.4.1](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.4.0...v1.4.1) (2025-05-07)


### Bug Fixes

* **deps:** update dependency motion-v to v1.0.2 ([#30](https://github.com/PhyberApex/slds-json-schema-renderer/issues/30)) ([d60372b](https://github.com/PhyberApex/slds-json-schema-renderer/commit/d60372bf19ef773e34da34574e3453c4e73b5fce))

# [1.4.0](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.3.4...v1.4.0) (2025-05-07)


### Bug Fixes

* Removed init command ([1b38633](https://github.com/PhyberApex/slds-json-schema-renderer/commit/1b38633ad890a6d40873a0a6a3724a0887565034))


### Features

* Add support for const keyword and remove _metadata from raw json view ([0e7be78](https://github.com/PhyberApex/slds-json-schema-renderer/commit/0e7be7894bbcbc6ba75b94a1d2496471f8645bdd))

## [1.3.4](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.3.3...v1.3.4) (2025-05-07)


### Bug Fixes

* remove asset of vue ([25b0609](https://github.com/PhyberApex/slds-json-schema-renderer/commit/25b060943befe8e766795efa20d5657fe16057b0))

## [1.3.3](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.3.2...v1.3.3) (2025-05-07)


### Bug Fixes

* remove peer dependency on vue ([b64e580](https://github.com/PhyberApex/slds-json-schema-renderer/commit/b64e580d7f4422df4b81fc7439d5e7c1a07d8269))

## [1.3.2](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.3.1...v1.3.2) (2025-04-28)


### Bug Fixes

* Naming of the bin ([76b7af8](https://github.com/PhyberApex/slds-json-schema-renderer/commit/76b7af8a201dc67598b87b1e6f8d531880793dca))

## [1.3.1](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.3.0...v1.3.1) (2025-04-27)


### Bug Fixes

* Fix motion requiring process ([6c263d3](https://github.com/PhyberApex/slds-json-schema-renderer/commit/6c263d36884edbdfbf1d33686727a2b59982450d))

# [1.3.0](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.2.0...v1.3.0) (2025-04-27)


### Features

* Added enum handling, better animations more support for constraints and removed redundant files ([1d9789f](https://github.com/PhyberApex/slds-json-schema-renderer/commit/1d9789fe116153e8fd805dcb6e3797fb58294fb2))

# [1.2.0](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.1.0...v1.2.0) (2025-04-27)


### Features

* Better composition support ([9ebde90](https://github.com/PhyberApex/slds-json-schema-renderer/commit/9ebde90b1acebf5c4100329ef88d064546f5b0b7))

# [1.1.0](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.0.4...v1.1.0) (2025-04-26)


### Bug Fixes

* **deps:** update dependency @salesforce-ux/design-system to v2.26.3 ([#23](https://github.com/PhyberApex/slds-json-schema-renderer/issues/23)) ([8b04af0](https://github.com/PhyberApex/slds-json-schema-renderer/commit/8b04af04ddd8ac5dcabe6935d79fd2043e0aa6a9))
* **deps:** update dependency glob to v11.0.2 ([#24](https://github.com/PhyberApex/slds-json-schema-renderer/issues/24)) ([8f36f6d](https://github.com/PhyberApex/slds-json-schema-renderer/commit/8f36f6dd86797757df4debc8534022e7882ef91b))
* Fixed imports ([4a65ec5](https://github.com/PhyberApex/slds-json-schema-renderer/commit/4a65ec56019c6752cb274e1772db6eed7139ecb4))


### Features

* File references & better local dev ([#26](https://github.com/PhyberApex/slds-json-schema-renderer/issues/26)) ([92764ee](https://github.com/PhyberApex/slds-json-schema-renderer/commit/92764ee2e7d91bd4ee39a22251d7bc06a5b84c78))

## [1.0.4](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.0.3...v1.0.4) (2025-04-14)


### Bug Fixes

* Some layout changes. And reduced required node version ([7a0e8c4](https://github.com/PhyberApex/slds-json-schema-renderer/commit/7a0e8c4fad76c086f4d3fa567b0f543ac603854a))

## [1.0.3](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.0.2...v1.0.3) (2025-04-13)


### Bug Fixes

* Fix no properties message ([2889ba8](https://github.com/PhyberApex/slds-json-schema-renderer/commit/2889ba83c16ed5b2cbda86690f3dfd057d4bfcab))
* Move to @apidevtools/json-schema-ref-parser ([d41c709](https://github.com/PhyberApex/slds-json-schema-renderer/commit/d41c7096a4383577215ddbbb487631771a91108e))
* Remove no properties message if only pattern properties are available ([0212430](https://github.com/PhyberApex/slds-json-schema-renderer/commit/021243055f7cf7d0a11097aa3cc17ff0e4bd5060))
* Reorder properties in ObjectSchmea.vue ([9c2e7c3](https://github.com/PhyberApex/slds-json-schema-renderer/commit/9c2e7c3a0b922443771cc3e2b4fb4cfcb478f203))

## [1.0.2](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.0.1...v1.0.2) (2025-04-12)


### Bug Fixes

* Exlude vue again and fix cdn link ([b4964e9](https://github.com/PhyberApex/slds-json-schema-renderer/commit/b4964e92b046179ef9cd60718b7b0e5584a0023e))

## [1.0.1](https://github.com/PhyberApex/slds-json-schema-renderer/compare/v1.0.0...v1.0.1) (2025-04-12)


### Bug Fixes

* Bundle vue.js ([5407d83](https://github.com/PhyberApex/slds-json-schema-renderer/commit/5407d836f091d5af758cfd746c3dddc93130e5f4))

# 1.0.0 (2025-04-12)


### Features

* Add package-lock.json ([5dccefc](https://github.com/PhyberApex/slds-json-schema-renderer/commit/5dccefc035d5fe9137a56556049e2e61c273094c))
* Initial commit ([4275282](https://github.com/PhyberApex/slds-json-schema-renderer/commit/427528216310c634b9564925e08bc83b1dc63564))
