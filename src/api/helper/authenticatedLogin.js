import { reactive, h } from "vue";
import http from "@/api/index.js";
import { ElMessageBox, ElMessage } from "element-plus";
import { GlobalStore } from "@/store/globalStore";
import i18n from "@/language/index.js";
import authenticatedForm from "@/views/login/components/authenticatedForm.vue";

export const authenticatedMessageBox = async () => {
  const globalStore = GlobalStore();
  // 登录表单数据
  const loginForm = reactive({
    username: globalStore.userInfo.usercode,
    password: "",
  });

  await ElMessageBox({
    title: i18n.global.t('身份认证'),
    message: h(authenticatedForm, { loginForm: loginForm }),
    confirmButtonText: i18n.global.t('认证'),
    center: true,
    closeOnClickModal: false,
    closeOnPressEscape: false,
    showClose: false,
    draggable: true,
    beforeClose: async (action, instance, done) => {
      // beforeClose 关闭前执行
      //判断是否输入了密码
      if (!loginForm.password) {
        ElMessage({
          type: "warning",
          message: i18n.global.t('请输入密码！'),
        });
      } else {
        const res = await http.post("/core/login/login!login.action", qs.stringify({
          "loginInfo.usercode": loginForm.username,
          "loginInfo.userpass": loginForm.password
        }));
        if (res.loginMessage == "success") {
          //  存储 token
          globalStore.setToken(res.loginInfo[0].userid);
          done();
        } else {
          ElMessage({
            type: "warning",
            message: i18n.global.t('身份认证失败'),
          });
        }
      }
    },
  }).then(() => {
    ElMessage({
      type: "success",
      message: i18n.global.t('身份认证成功'),
    });
    ElMessageBox.close();
  });
};
