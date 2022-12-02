export default {
	menuList: [{
			icon: 'HomeFilled',
			title: '首页',
			path: '/home/index'
		},
		//客户管理
		{
			iconclass: 'layui-icon-extend-kehuqunzu',
			icon: '',
			title: '客户管理',
			path: '/customerManage',
			children: [{
					path: '/customerManage/customerApplication',
					title: '客户申请',
					icon: '',
					children: [{
							path: '/customerManage/customerApplication/newCustomer',
							title: '客户创建申请',
							icon: ''
						},
						{
							path: '/proTable/useComponent4',
							title: '客户变更申请',
							icon: ''
						}
					]
				},
				{
					path: '/proTable/useComponent5',
					title: '客户审核',
					icon: '',
					children: [{
							path: '/companyInfo_list_new6',
							title: '客户创建申请',
							icon: ''
						},
						{
							path: '/proTable/useComponent7',
							title: '客户变更申请',
							icon: ''
						}
					]
				}
			]
		},
		//报价管理
		{
			iconclass: 'layui-icon-extend-baojiadan',
			icon: '',
			title: '报价管理',
			path: '/appointmentManage',
			children: [{
					path: '/appointmentManage/appointmentApplication/appointment_query_list',
					title: '报价申请',
					icon: ''
					
				},
				{
					path: '/proTable/useComponent13',
					title: '报价审核',
					icon: ''
				},
				{
					path: '/proTable/useComponent13',
					title: '报价模板',
					icon: ''
				},
				{
					path: '/proTable/useComponent13',
					title: '报价确认',
					icon: ''
				},
				{
					path: '/proTable/useComponent13',
					title: '报价拆分',
					icon: ''
				},
				{
					path: '/proTable/useComponent13',
					title: '提用申请',
					icon: ''
				},
				{
					path: '/proTable/useComponent13',
					title: '提佣审核',
					icon: ''
				},
				{
					path: '/proTable/useComponent13',
					title: '销售代理提佣申请',
					icon: ''
				},
				{
					path: '/proTable/useComponent13',
					title: '销售提佣申请',
					icon: ''
				},
				{
					path: '/proTable/useComponent13',
					title: '销售提佣审核',
					icon: ''
				}
			]
		},
		//销账管理
		{
			iconclass: 'layui-icon-extend-xiaozhang',
			icon: '',
			title: '销账管理',
			path: '/xt14',
			children: [{
					path: '/companyInfo_list_new15',
					title: '客户创建申请',
					icon: ''
				},
				{
					path: '/proTable/useComponent16',
					title: '客户变更申请',
					icon: ''
				}
			]
		},
		//协议管理
		{
			iconclass: 'layui-icon-extend-xiaozhang',
			icon: '',
			title: '协议管理',
			path: '/xt14',
			children: [{
					path: '/companyInfo_list_new15',
					title: '客户创建申请',
					icon: ''
				},
				{
					path: '/proTable/useComponent16',
					title: '客户变更申请',
					icon: ''
				}
			]
		},

		//快递服务管理
		{
			iconclass: 'layui-icon-extend-xiaozhang',
			icon: '',
			title: '快递服务管理',
			path: '/xt14',
			children: [{
					path: '/companyInfo_list_new15',
					title: '客户创建申请',
					icon: ''
				},
				{
					path: '/proTable/useComponent16',
					title: '客户变更申请',
					icon: ''
				}
			]
		},

		//客户标签管理
		{
			iconclass: 'layui-icon-extend-kehubiaoqian',
			icon: '',
			title: '客户标签管理',
			path: '/xt8',
			children: [{
					path: '/companyInfo_list_new9',
					title: '客户创建申请',
					icon: '',
					i8i1 :""
				},
				{
					path: '/proTable/useComponent10',
					title: '客户变更申请',
					icon: ''
				}
			]
		},

		//申请单管理
		{
			iconclass: 'layui-icon-extend-shenqingguanli',
			icon: '',
			title: '申请单管理',
			path: '/xt19',
			children: [{
					path: '/companyInfo_list_new17',
					title: '客户创建申请',
					icon: ''
				},
				{
					path: '/proTable/useComponent18',
					title: '客户变更申请',
					icon: ''
				}
			]
		},

		//INVOICE对冲管理
		{
			iconclass: 'layui-icon-extend-shenqingguanli',
			icon: '',
			title: 'INVOICE对冲管理',
			path: '/xt19',
			children: [{
					path: '/companyInfo_list_new17',
					title: '客户创建申请',
					icon: ''
				},
				{
					path: '/proTable/useComponent18',
					title: '客户变更申请',
					icon: ''
				}
			]
		},

		//综合查询
		{
			iconclass: 'layui-icon-extend-shenqingguanli',
			icon: '',
			title: '综合查询',
			path: '/xt19',
			children: [{
					path: '/companyInfo_list_new17',
					title: '客户创建申请',
					icon: ''
				},
				{
					path: '/proTable/useComponent18',
					title: '客户变更申请',
					icon: ''
				}
			]
		},


		{
			iconclass: 'layui-icon-extend-xitongshezhi',
			icon: '',
			title: '系统',
			path: '/xt20',
			children: [{
					path: '/companyInfo_list_new21',
					title: '客户创建申请',
					icon: ''
				},
				{
					path: '/proTable/useComponent22',
					title: '客户变更申请',
					icon: ''
				}
			]
		}
	]

}
