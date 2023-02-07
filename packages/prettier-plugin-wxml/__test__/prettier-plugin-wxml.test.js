const prettier = require('prettier');
const prettierPluginWxml = require('..');

const code = `
<wxs src="../common/utils/wxs/namespace.wxs" module="namespace" />
<wxs src="./index.wxs" module="utils" />

<view
wx:if="{{ option.length > 0 }}"
wx:if="{{initialized}}"
wx:for="{{list}}"
aAxxx
cCxxx="{{({cCxxx})}}"
bBxxx="{{bBxxx}}"
bind:transitionend="onTransitionEnd"
bindtransitionendx="onTransitionEnd"
catch:touchmove="{{ preventScroll }}"
capture-bindtouchmove="{{ preventScroll }}"
capture-bind:touchmove="{{ preventScroll }}"
capture-catch:touchmove="{{ preventScroll }}"
capture-catchtouchmove="{{ preventScroll }}"
mut-bindtouchmove="{{ preventScroll }}"
mut-bind:touchmove="{{ preventScroll }}"
>
<slot />
{{ cancelText }}
</view>
<view wx:if="{{ placeholder }}" style="height: {{ height }}px;"></view>
`;

const code2 = `
<wxs src="../common/utils/wxs/namespace.wxs" module="namespace" />
<wxs src="./index.wxs" module="utils" />

<view
class="{{ namespace.join('tab-bar') }} {{ namespace.handle('tab-bar',[utils.isBorder(separation) ? 'border' : '']) }}  ext-class"
>
<view wx:if="{{ utils.isShadow(separation) }}" class="{{ namespace.handle('tab-bar',['shadow']) }}" />
<block wx:if="{{option.length > 0 }}">
<ti-tabbar-item
wx:for="{{ option }}"
wx:key="index"
title="{{ item.title }}"
icon="{{ item.icon }}"
value="{{ item.value || null }}"
on-clolr="{{ item.onClolr || '#FF2E2E' }}"
off-clolr="{{ item.offColor || '#757575' }}"
icon-size="{{ item.iconSize || 54 }}"
title-size="{{ item.titleSize || 20 }}"
class="{{ namespace.handle('tab-bar',['item']) }} internal_children"
/>
</block>
<slot wx:else />
</view>
<view wx:if="{{ placeholder }}" style="height: {{ height }}px;"></view>
`;

const code3 = `
<wxs src="./index.wxs" module="utils" />
<wxs src="../common/utils/wxs/namespace.wxs" module="namespace" />

<!-- test common -->
<ti-page option="{{ option }}" bind:change="onChange">
</ti-page>
<view
  wx:if="{{ utils.isDoubleColorIcon(name) }}"
  class="{{ namespace.join('icon') }} ext-class"
  style="{{ doubleStyle }}"
>文字测试
	文字测试
  文字测试<view
    bind:tap="onClick"
    style="background-image: url({{ quot }}data:image/svg+xml, %3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'  %3E%3Cpath d='{{ utils.getSvgPath(name,0) }}' fill='{{ (   isStr ? colors : colors[0]) || 'rgb(158,158,158)' }}' /%3E%3Cpath d='{{ utils.getSvgPath(name,1) }}' fill='{{ (isStr ? colors : colors[1]) || 'rgb(255,255,255)' }}' /%3E%3C/svg%3E{{ quot }}); {{ style }} "
    class="{{ namespace.join('icon') }} {{ namespace.handle('icon',[name,spin ? 'spin':'', {a:b===c,a:b==c}]) }}  "
  />
  <text>文字测试</text>
</view>
<view
  wx:else
  class="{{ namespace.join('icon') }} {{ namespace.handle('icon',[name,spin ? 'spin':'']) }}   ext-class"
  style="{{ style }}"
  bind:tap="onClick"
></view>
<view><text>2</text></view>
<view><text></text></view>`;

const code4 = `
<!--page/calendar/month.wxml-->

<view>
<button
bind:tap="onTap"
data-key="type"
data-value="single"
class="btn-cal {{ type === 'single' ? 'btn--primary' : '' }}"
>
单选
</button>
<button
bind:tap="onTap"
data-key="type"
data-value="multiple"
class="btn-cal {{ type === 'multiple' ? 'btn--primary' : '' }}"
>
多选
</button>

<button
bind:tap="onTap"
data-key="type"
data-value="range"
class="btn-cal {{ type === 'range' ? 'btn--primary' : '' }}"
>
范围
</button>
</view>
<view>
<button bind:tap="onTap" data-key="round" data-value="{{ true }}" class="btn-cal {{ round ? 'btn--primary' : '' }}">
圆角
</button>
<button bind:tap="onTap" data-key="round" data-value="{{ false }}" class="btn-cal {{ !round ? 'btn--primary':'' }}">
直角
</button>
</view>
<view>
<button
bind:tap="onTap"
data-key="color"
data-value="#2580FF"
class="btn-cal {{ color === '#2580FF' ? 'btn--primary' : '' }}"
>
蓝色
</button>
<button
bind:tap="onTap"
data-key="color"
data-value="#DB2B13"
class="btn-cal {{ color === '#DB2B13' ? 'btn--primary' : '' }}"
>
红色
</button>
</view>

<view>
<button
bind:tap="onTap"
data-key="position"
data-value="left"
class="btn-cal {{ position === 'left' ? 'btn--primary' : '' }}"
>
left
</button>
<button
bind:tap="onTap"
data-key="position"
data-value="bottom"
class="btn-cal {{ position === 'bottom' ? 'btn--primary' : '' }}"
>
bottom
</button>
</view>
<view>
<button
bind:tap="onTap"
data-key="maxSize"
data-value="{{ 0 }}"
class="btn-cal {{ maxSize <= 0 ? 'btn--primary' : '' }}"
>
不设最大数量
</button>
<button
bind:tap="onTap"
data-key="maxSize"
data-value="{{ 3 }}"
class="btn-cal {{ maxSize > 0 ? 'btn--primary' : '' }}"
>
设置最多3个
</button>
</view>

<view>
<button
bind:tap="onRange"
data-value="{{ ['2010/01/07','2011/10/07'] }}"
data-range="{{ 0 }}"
class="btn-cal {{ range === 0 ? 'btn--primary' : '' }}"
>
2010/01/07-2011/10/07
</button>
<button
bind:tap="onRange"
data-range="{{ 1 }}"
data-value="{{ ['2021/01/07','2022/10/07'] }}"
class="btn-cal {{ range !== 0 ? 'btn--primary' : '' }}"
>
2020/01/07-2021/10/07
</button>
</view>

<view>
<button
bind:tap="onTap"
data-key="maxRange"
data-value="{{ 0 }}"
class="btn-cal {{ maxRange <= 0 ? 'btn--primary' : '' }}"
>
不设最大范围
</button>
<button
bind:tap="onTap"
data-key="maxRange"
data-value="{{ 3 }}"
class="btn-cal {{ maxRange > 0 ? 'btn--primary' : '' }}"
>
三天最大范围
</button>
</view>

<view>
<button
bind:tap="onTap"
data-key="allowSameDay"
data-value="{{ true }}"
class="btn-cal {{ allowSameDay ? 'btn--primary' : '' }}"
>
起止日期同天
</button>
<button
bind:tap="onTap"
data-key="allowSameDay"
data-value="{{ false }}"
class="btn-cal {{ !allowSameDay  ? 'btn--primary':'' }}"
>
起止日期不同天
</button>
</view>

<view>
<button bind:tap="onOpen" class="btn-cal  " data-controlled="{{ false }}">
打开非受控日历
</button>

<button bind:tap="onOpen" class="btn-cal  " data-controlled="{{ true }}">
打开受控日历
</button>
</view>
<view class="tiled-calendar">
<ti-calendar
bind:close="onClose"
visible="{{ visible }}"
format="{{ format }}"
class-name="t1"
position="{{ position }}"
type="{{ type }}"
default-value="{{ defaultDate }}"
min-date="{{ minDate }}"
max-date="{{ maxDate }}"
bind:confirm="onConfirm"
bind:select="onSelect"
bind:error="onError"
color="{{ color }}"
round="{{ round }}"
data-controlled="{{ false }}"
max-range="{{ maxRange }}"
max-size="{{ maxSize }}"
allow-same-day="{{ allowSameDay }}"
/>
</view>

<view class="tiled-calendar">
<ti-calendar
visible="{{ visibleControlled }}"
format="{{ format }}"
position="{{ position }}"
type="{{ type }}"
value="{{ controlledValue }}"
min-date="{{ minDate }}"
max-date="{{ maxDate }}"
color="{{ color }}"
round="{{ round }}"
max-range="{{ maxRange }}"
max-size="{{ maxSize }}"
allow-same-day="{{ allowSameDay }}"
data-controlled="{{ true }}"
bind:close="onClose"
bind:confirm="onConfirm"
bind:select="onControlledSelect"
bind:error="onError"
/>
</view>

<ti-toast id="titian-toast" />
`;

describe('test prettier-plugin-wxml', () => {
  it('should format code correctly', () => {
    const formatted = prettier.format(code, {
      parser: 'wxml',
      plugins: [prettierPluginWxml]
    });
    expect(formatted).toMatchSnapshot();
  });

  it('should format code2 correctly', () => {
    const formatted = prettier.format(code2, {
      parser: 'wxml',
      plugins: [prettierPluginWxml]
    });
    expect(formatted).toMatchSnapshot();
  });

  it('should format code3 correctly', () => {
    const formatted = prettier.format(code3, {
      parser: 'wxml',
      plugins: [prettierPluginWxml]
    });
    expect(formatted).toMatchSnapshot();
  });

  it('should format code4 correctly', () => {
    const formatted = prettier.format(code4, {
      parser: 'wxml',
      plugins: [prettierPluginWxml]
    });
    expect(formatted).toMatchSnapshot();
  });
});
