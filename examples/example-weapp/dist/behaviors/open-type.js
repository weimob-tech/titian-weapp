export default Behavior({
    properties: {
        // 微信开放能力
        openType: String,
        // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。
        lang: {
            type: String,
            value: 'en'
        },
        // 会话来源，open-type="contact"时有效
        sessionFrom: String,
        // 会话内消息卡片标题，open-type="contact"时有效
        sendMessageTitle: String,
        // 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
        sendMessagePath: String,
        // 会话内消息卡片图片，open-type="contact"时有效
        sendMessageImg: String,
        // 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
        appParameter: String,
        // 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，open-type="contact"时有效
        showMessageCard: Boolean
    },
    data: {
        innerOpenType: '',
        scope: ''
    },
    observers: {
        openType (openType) {
            // #ifdef MP-ALIPAY
            if (openType === 'getPhoneNumber') {
                this.setData({
                    innerOpenType: 'getAuthorize',
                    scope: 'phoneNumber'
                });
            } else if (openType === 'getUserInfo') {
                this.setData({
                    innerOpenType: 'getAuthorize',
                    scope: 'userInfo'
                });
            } else {
                this.setData({
                    innerOpenType: openType
                });
            }
            // #endif
            // #ifdef MP-WEIXIN || MP-XHS || MP-KS
            this.setData({
                innerOpenType: openType
            });
        // #endif
        }
    },
    methods: {
        onGetuserinfo (event) {
            // 用户点击该按钮时，会返回获取到的用户信息，回调的detail数据与wx.getUserInfo返回的一致，open-type="getUserInfo"时有效
            this.triggerEvent('getuserinfo', event.detail);
        },
        onContact (event) {
            // 客服消息回调，open-type="contact"时有效
            this.triggerEvent('contact', event.detail);
        },
        onGetphonenumber (event) {
            // 获取用户手机号回调，open-type=getPhoneNumber时有效
            this.triggerEvent('getphonenumber', event.detail);
        },
        onError (event) {
            // 当使用开放能力时，发生错误的回调，open-type=launchApp时有效
            this.triggerEvent('error', event.detail);
        },
        onOpensetting (event) {
            // 在打开授权设置页后回调，open-type=openSetting时有效
            this.triggerEvent('opensetting', event.detail);
        },
        onLaunchapp (event) {
            // 打开 APP 成功的回调，open-type=launchApp时有效
            this.triggerEvent('launchapp', event.detail);
        },
        bindGetAuthorize (event) {
            // #ifdef MP-ALIPAY
            const { scope , innerOpenType  } = this.data;
            if (innerOpenType === 'getAuthorize' && scope === 'phoneNumber') {
                this.triggerEvent('getphonenumber', event.detail);
            }
            if (innerOpenType === 'getAuthorize' && scope === 'userInfo') {
                this.triggerEvent('getuserinfo', event.detail);
            }
            this.triggerEvent('getAuthorize', event.detail);
        // #endif
        },
        bindFollowLifestyle (event) {
            // 支付宝渠道有效， 当 open-type 为 lifestyle 时有效
            // #ifdef MP-ALIPAY
            this.triggerEvent('followLifestyle', event.detail);
        // #endif
        }
    }
});
