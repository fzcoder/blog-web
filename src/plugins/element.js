/* eslint-disable import/no-duplicates */
import Vue from 'vue'
import { Button } from 'element-ui'
import { Container } from 'element-ui'
import { Header } from 'element-ui'
import { Main } from 'element-ui'
import { Footer } from 'element-ui'
import { Menu } from 'element-ui'
import { MenuItem } from 'element-ui'
import { Card } from 'element-ui'
import { Input } from 'element-ui'
import { Message } from 'element-ui'
import { Col } from 'element-ui'
import { Row } from 'element-ui'
import { Carousel } from 'element-ui'
import { CarouselItem } from 'element-ui'
import { Pagination } from 'element-ui'
import { Avatar } from 'element-ui'
import { Tag } from 'element-ui'
import { Image } from 'element-ui'
import { PageHeader } from 'element-ui'
import { Loading } from 'element-ui'
import { Link } from 'element-ui'
import { Backtop } from 'element-ui'
import { Tooltip } from 'element-ui'
import { Badge } from 'element-ui'

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Card)
Vue.use(Input)
Vue.use(Col)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Row)
Vue.use(Pagination)
Vue.use(Avatar)
Vue.use(Tag)
Vue.use(Image)
Vue.use(PageHeader)
Vue.use(Loading)
Vue.use(Link)
Vue.use(Backtop)
Vue.use(Tooltip)
Vue.use(Badge)

// 挂载弹框提示组件
Vue.prototype.$message = Message
