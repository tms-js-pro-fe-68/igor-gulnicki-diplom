


export default function Footer() {
    const email = 'igor@mail.ru';
    const text11 = 'Компания «Tuotown» – эксклюзивный представитель профессиональных кухонных ножей, изготовленных лучшими мастерами Восточной Азии  с применением передового европейского оборудования и современных материалов.Они отличаются идеальным балансом и фантастической остротой.   Сочетают в себе вековые традиции и новейшие разработки.    Также предлагаем широкий ассортимент сопутствующих товаров.';
    const youtube = "https://www.youtube.com/watch?v=L9jkEEpKjP8";




    return (
        <footer>
            <div className="footerFon">
                <div className="container4">

                    <div className="footerBlock1">
                        <div className="block_tuotown">
                            <div className="tuotown"></div>


                            <div className="text10">легендарные ножи, создающие шедевры</div>
                        </div>

                        <div className="text11">{text11}</div>

                    </div>

                    <div className="footerBlock2">
                        <div className="infomation">
                            <div className="text12">Информация</div>
                            <div className="text13">
                                <ul className="list">
                                    <li><a className="about" href={email}>Главная</a></li>
                                    <li><a className="about" href={email}>Новости</a></li>
                                    <li><a className="about" href={email}>О компании</a></li>
                                    <li><a className="about" href={email}>Контакты</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="catalog">
                            <div className="text14">Каталог</div>
                            <div className="text15">
                                <ul className="list">
                                    <li><a className="about" href={email}>Кухонные ножи</a></li>
                                    <li><a className="about" href={email}>Складные ножи</a></li>
                                    <li><a className="about" href={email}>Точилки для ножей</a></li>
                                    {/* <!-- <li><a class="about" href="">Аксессуары</a></li> --> */}
                                </ul>
                                <a className="about" href={email}>Аксессуары</a>
                            </div>
                        </div>

                        <div className="social_network">
                            <div className="text16">Мы в соцсетях</div>

                            <div className="social">
                                {/* <a href={email}> <img src="./social_network/facebook.png" alt=""> </a>
                                <a href={email}><img src="./social_network/vk.png" alt=""></a>
                                <a href={email}><img src="./social_network/instagramm.png" alt=""></a>
                                <a href="https://www.youtube.com/watch?v=tQa-QYa_hoM"></a> */}
                                <a className="youtube" href={youtube} />
                            </div>
                        </div>
                    </div>

                    <div className="footerBlock3">
                        <div className="contact_information">Контактная информация</div>
                        <div className="connection">+7 (981) 120-11-17</div>

                        <div className="mail">
                            <a className="tuo_mail" href={email}>tuotown@mail.ru</a>

                        </div>

                        <div className="working_hours">08:00 — 18:00, ежедневно</div>
                        <div className="location">Россия, Москва, МКАД, 19-й километр,
                            вл20с1, вход Ф, 22-68-70
                        </div>

                        <div className="transition">
                            {/* <a href=""><img src="./transition.png" alt=""></a> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="last">
                <div className="container5">
                    <div className="trademark">TUOTOWN © 2021 Торговая марка TUOTOWN зарегистрирована.
                        Все права защищены и принадлежат правообладателям.
                    </div>

                    <div className="support">
                        <img src="./support.png" alt="portlandlogo" />
                        <img src="D:\projects\portland.com\src\images\portland.png" alt="portlandlogo" />
                    </div>
                </div>
            </div>
        </footer>
    );
}