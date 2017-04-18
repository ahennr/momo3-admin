Ext.define('MoMo.admin.view.viewport.ViewportModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.momo-mainviewport',

    data: {
        currentView: null,
        user: null,
        i18n: {
            logoutTitle: 'Log out',
            logoutMessage: 'Are you sure you want to log out?'
        }
    },
    formulas: {
        profileImage: function() {
            var profileImage;
            if (this.get('user') && this.get('user').getData()) {
                profileImage = this.get('user').getData().profileImage;
            }
            if (!profileImage) {
                profileImage = 'resources/images/emptyUserAvatar.png';
            }
            return profileImage;
        }
    }
});
