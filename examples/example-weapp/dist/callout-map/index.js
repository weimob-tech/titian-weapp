Component({
    options: {
        addGlobalClass: true
    },
    properties: {
        longitude: {
            type: Number,
            value: 0,
            observer (newVal) {
                this.setData({
                    centerLongitude: newVal
                });
            }
        },
        latitude: {
            type: Number,
            value: 0,
            observer (newVal) {
                this.setData({
                    centerLatitude: newVal
                });
            }
        },
        mapHeight: {
            type: Number,
            value: 0,
            observer (newVal) {
                this.setDefaultHeight(newVal);
            }
        },
        calloutStyle: {
            type: Object,
            value: {},
            observer (newVal) {
                if (!newVal) return;
                const { bottomMargin , pageMargin , topMargin  } = newVal;
                const newCssVar = {
                    '--callout-margin-top': `${topMargin || 0}rpx`,
                    '--callout-margin-bottom': `${bottomMargin || 0}rpx`,
                    '--callout-margin-left': `${pageMargin || 0}rpx`,
                    '--callout-margin-right': `${pageMargin || 0}rpx`
                };
                const { cssVariableObj  } = this.data;
                this.setData({
                    cssVariableObj: {
                        ...cssVariableObj,
                        ...newCssVar
                    }
                });
            }
        },
        markers: {
            type: Array,
            value: []
        }
    },
    data: {
        innerMarkers: [],
        centerLongitude: 0,
        centerLatitude: 0,
        cssVariableObj: {},
        cssVariableStyle: '',
        hasAlwaysDisplayCallout: true,
        mapContext: {}
    },
    lifetimes: {
        ready () {
            const context = wx.createMapContext('map', this);
            this.data.mapContext = context;
            if (!this.data.mapHeight) {
                this.setDefaultHeight();
            }
            this.findNearestAndSetCenter();
        }
    },
    observers: {
        markers: function markersChanged(markers) {
            const innerMarkers = markers.map((m)=>({
                    ...m,
                    iconPath: m.iconPath || `https://cdn2.weimob.com/saas/@assets/saas-fe-basis-web-stc/cms/h5/position.png`,
                    width: '48rpx',
                    height: '48rpx',
                    zIndex: 0,
                    customCallout: {
                        display: 'CLICK'
                    }
                }));
            this.setData({
                innerMarkers
            });
            this.findNearestAndSetCenter();
        },
        cssVariableObj: function cssVariableObjChanged(cssVariableObj) {
            let cssVariableStyle = '';
            Object.keys(cssVariableObj).forEach((key)=>{
                cssVariableStyle += `${key}: ${cssVariableObj[key]};`;
            });
            this.setData({
                cssVariableStyle
            });
        }
    },
    methods: {
        setDefaultHeight (newVal) {
            if (!newVal) {
                const query = this.createSelectorQuery();
                query.select('#map').boundingClientRect();
                query.exec((res)=>{
                    const { width  } = res[0];
                    const newCssVar = {
                        '--callout-map-height': `${width}px`
                    };
                    this.setData({
                        cssVariableObj: {
                            ...this.data.cssVariableObj,
                            ...newCssVar
                        }
                    });
                });
            } else {
                const newCssVar = {
                    '--callout-map-height': newVal ? `${newVal}rpx` : `initial`
                };
                this.setData({
                    cssVariableObj: {
                        ...this.data.cssVariableObj,
                        ...newCssVar
                    }
                });
            }
        },
        clickMap (event) {
            // this.switchAlwaysDisplayCallout();
            if (this.data.hasAlwaysDisplayCallout) {
                this.switchAlwaysDisplayCallout();
                this.setData({
                    hasAlwaysDisplayCallout: false
                });
            }
        },
        clickMarker (event) {
            const { markerId  } = event;
            const marker = this.data.markers.find((i)=>i.id === markerId);
            const { latitude , longitude  } = marker;
            this.setData({
                centerLongitude: longitude,
                centerLatitude: latitude
            });
            this.data.mapContext.moveToLocation({
                latitude,
                longitude
            });
            // console.log('clickMarker - this.data.hasAlwaysDisplayCallout', this.data.hasAlwaysDisplayCallout);
            if (this.data.hasAlwaysDisplayCallout) {
                this.switchAlwaysDisplayCallout({
                    latitude,
                    longitude
                });
            }
        },
        clickCallout (event) {
            const { markerId  } = event;
            const marker = this.data.markers.find((i)=>i.id === markerId);
            const { latitude , longitude , title1 , title2  } = marker;
            wx.openLocation({
                name: title1,
                address: title2,
                latitude,
                longitude,
                scale: 18
            });
        },
        findNearestAndSetCenter () {
            if (this.data.innerMarkers.length === 0) return;
            wx.getLocation({
                type: 'wgs84',
                success: (res)=>{
                    const { latitude , longitude  } = res;
                    const { innerMarkers  } = this.data;
                    const p1 = {
                        latitude,
                        longitude
                    };
                    let minDistance = -1;
                    let nearestMarker = {
                        latitude: 0,
                        longitude: 0
                    };
                    innerMarkers.forEach((m)=>{
                        const p2 = {
                            latitude: m.latitude,
                            longitude: m.longitude
                        };
                        const distance = this.getFlatternDistance(p1, p2);
                        if (minDistance === -1 || distance < minDistance) {
                            minDistance = distance;
                            nearestMarker = m;
                        }
                    });
                    this.setData({
                        centerLongitude: nearestMarker.longitude,
                        centerLatitude: nearestMarker.latitude
                    });
                    this.includePointsAndMoveToCenter({
                        longitude: nearestMarker.longitude,
                        latitude: nearestMarker.latitude
                    });
                    // this.data.mapContext.moveToLocation({ latitude: nearestMarker.latitude, longitude: nearestMarker.longitude });
                    if (this.data.hasAlwaysDisplayCallout) {
                        this.switchAlwaysDisplayCallout({
                            longitude: nearestMarker.longitude,
                            latitude: nearestMarker.latitude
                        });
                    }
                },
                fail: ()=>{
                    this.setData({
                        centerLongitude: this.data.innerMarkers[0].longitude,
                        centerLatitude: this.data.innerMarkers[0].latitude
                    });
                    this.includePointsAndMoveToCenter({
                        latitude: this.data.innerMarkers[0].latitude,
                        longitude: this.data.innerMarkers[0].longitude
                    });
                    if (this.data.hasAlwaysDisplayCallout) {
                        this.switchAlwaysDisplayCallout({
                            longitude: this.data.innerMarkers[0].longitude,
                            latitude: this.data.innerMarkers[0].latitude
                        });
                    }
                }
            });
        },
        includePointsAndMoveToCenter (center) {
            if (!this.data.mapContext.includePoints) {
                return;
            }
            this.data.mapContext.includePoints({
                points: this.data.innerMarkers,
                complete: ()=>{
                    setTimeout(()=>{
                        this.data.mapContext.moveToLocation({
                            longitude: center.longitude,
                            latitude: center.latitude,
                            fail: ()=>{
                                this.setData({
                                    longitude: center.longitude,
                                    latitude: center.latitude
                                });
                            }
                        });
                    }, 800);
                }
            });
        },
        switchAlwaysDisplayCallout (position) {
            const { innerMarkers  } = this.data;
            let longitude;
            let latitude;
            if (position) {
                longitude = position.longitude;
                latitude = position.latitude;
            }
            const newMarkers = innerMarkers.map((x)=>{
                if (x.longitude === longitude && x.latitude === latitude) {
                    x.customCallout.display = 'ALWAYS';
                } else {
                    x.customCallout.display = 'BYCLICK';
                }
                return x;
            });
            console.log('newMarkers', newMarkers);
            this.setData({
                innerMarkers: newMarkers
            });
        },
        getRad (d) {
            return d * Math.PI / 180.0;
        },
        getFlatternDistance (point1, point2) {
            const EARTH_RADIUS = 6378137.0; // 地球单位M
            const { longitude: longitude1 , latitude: latitude1  } = point1;
            const { longitude: longitude2 , latitude: latitude2  } = point2;
            const f = this.getRad((latitude1 + latitude2) / 2);
            const g = this.getRad((latitude1 - latitude2) / 2);
            const l = this.getRad((longitude1 - longitude2) / 2);
            let sg = Math.sin(g);
            let sl = Math.sin(l);
            let sf = Math.sin(f);
            const a = EARTH_RADIUS;
            const fl = 1 / 298.257;
            sg *= sg;
            sl *= sl;
            sf *= sf;
            const s = sg * (1 - sl) + (1 - sf) * sl;
            const c = (1 - sg) * (1 - sl) + sf * sl;
            const w = Math.atan(Math.sqrt(s / c));
            const r = Math.sqrt(s * c) / w;
            const d = 2 * w * a;
            const h1 = (3 * r - 1) / 2 / c;
            const h2 = (3 * r + 1) / 2 / s;
            return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
        }
    }
});
