const city = [
  {
    code: '820000',
    name: '澳门'
  },
  {
    code: '130000',
    name: '河北省',
    children: [
      {
        code: '130100',
        name: '石家庄市',
        children: [
          {
            code: '130102',
            name: '长安区'
          },
          {
            code: '130104',
            name: '桥西区'
          },
          {
            code: '130105',
            name: '新华区'
          }
        ]
      },
      {
        code: '130200',
        name: '唐山市',
        children: [
          {
            code: '130202',
            name: '路南区'
          },
          {
            code: '130203',
            name: '路北区'
          },
          {
            code: '130204',
            name: '古冶区'
          }
        ]
      },
      {
        code: '130300',
        name: '秦皇岛市'
      }
    ]
  },
  {
    code: '330000',
    name: '浙江省',
    children: [
      {
        code: '330100',
        name: '杭州市',
        children: [
          {
            code: '330114',
            name: '钱塘区'
          },
          {
            code: '330122',
            name: '桐庐县'
          },
          {
            code: '330127',
            name: '淳安县'
          },
          {
            code: '330182',
            name: '建德市'
          }
        ]
      },
      {
        code: '330200',
        name: '宁波市',
        children: [
          {
            code: '330226',
            name: '宁海县'
          },
          {
            code: '330281',
            name: '余姚市'
          },
          {
            code: '330282',
            name: '慈溪市'
          }
        ]
      },
      {
        code: '330300',
        name: '温州市',
        children: [
          {
            code: '330381',
            name: '瑞安市'
          },
          {
            code: '330382',
            name: '乐清市'
          },
          {
            code: '330383',
            name: '龙港市'
          }
        ]
      },
      {
        code: '330400',
        name: '嘉兴市',
        children: [
          {
            code: '330481',
            name: '海宁市'
          },
          {
            code: '330482',
            name: '平湖市'
          },
          {
            code: '330483',
            name: '桐乡市'
          }
        ]
      },
      {
        code: '330500',
        name: '湖州市',
        children: [
          {
            code: '330521',
            name: '德清县'
          },
          {
            code: '330522',
            name: '长兴县'
          },
          {
            code: '330523',
            name: '安吉县'
          }
        ]
      }
    ]
  }
];
export const cityValue = ['330000', '330300', '330327'];
export default city;

export const cascade = 'cityList';
export const coincidenceCity = [
  {
    [cascade]: [
      {
        code: '320500',
        name: '苏州市'
      }
    ],
    code: '320000',
    name: '江苏省'
  },
  {
    [cascade]: [
      {
        code: '330100',
        name: '杭州市'
      }
    ],
    code: '330000',
    name: '浙江省'
  },
  {
    [cascade]: [
      {
        code: '310100',
        name: '上海市'
      },
      {
        code: '310000',
        name: '上海市2'
      }
    ],
    code: '310000',
    name: '上海市1'
  },
  {
    [cascade]: [
      {
        code: '440100',
        name: '广州市'
      }
    ],
    code: '440000',
    name: '广东省'
  }
];
export const coincidenceCityValue = ['310000', '310000'];
