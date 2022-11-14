import config from "../config.json"
import styled from "styled-components";
import {CSSReset} from "../src/components/CSSReset";
import Menu from "../src/components/Menu"
import { StyledTimeline } from "../src/components/Timeline";
/* o reset serve para remover alguns estilos globais que já vêm por padrão em navegadores ou
que não vêm para não haverem surpresas do que não foi configurado pelo programador*/


function HomePage() {

    //dando um console.log e acostumar a ver esse código entendendo o que está rolando com ele
    //console.log(config.playlists);   

    /*sempre que estiver criando componente no return colocar o ()
    pois é possível quebrar linha e ter mais flexibilidade */
    return (
        <>
            <CSSReset />
            {/*a chave {} indica que algo JavaScript será escrito e o conteúdo dela
            é o valor que queremos de fato*/}
            <div>
                <Menu />
                <Header banner={config.banner}/>

                {/* passar playlist para Timeline*/}{/* para passar conteúdo no meio de alguma coisa abrimos ele e o children 
                                                        vem automáticamente*/}
                {/* O styled components é um atalho para criar uma função, criar o css e 
                passar um children automático*/}
                <Timeline playlists={config.playlists} favoritos={config.favorites}>
                    Conteúdo
                </Timeline>
            </div>
        </>
            //trabalhando com props vamos passar valores para os nosso componentes do que eles precisam fazer de fato
    );
}

export default HomePage

// -------------------------
/*function Menu() {
    return (
        <div>
            Menu
        </div>
    )
}
*/ 
// -------------------------

//criando um componente que já tem o seu próprio estilo
//estilizando o que há dentro do div i.e. a img que está dentro do div
//se o tamanho das bordas for arredondado em mais de 50% ela vira um círculo
const StyledHeader = styled.div`
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%
    }

    .user-info{
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;   
    }
`;

const StyledBanner = styled.section`
    img {
        width: 100%;
        height: 300px;
        border-radius: 0%;
    }
`;

function Header(props) {
    return (
        //troco o StyledHeader pela div que estava aqui envolvendo
        //componente que já tem o seu próprio estilo

        //obs: não é boa prática criar Styled Components para tudo, só quando for necessário e cabível
        <StyledHeader>
            <StyledBanner> <img src={props.banner}/> </StyledBanner>
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    );
}


const StyledFavorites = styled.div`
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
`;

//aqui em cima, tudo o que é passado para um componente vem como um valor só, que é o props, chamado de propriedas nesse caso
function Timeline(propriedades) {

    //console.log("Dentro do componente", propriedades.playlists);

    //pegando as chaves do objeto
    const playlistNames = Object.keys(propriedades.playlists);
    const favorites = Object.keys(propriedades.favoritos)


    //dominando objeto, array e função o react começa a ficar bem mais tranquilo

    //o React prefere tudo o que tem retorno por expressão // o próprio playlist tem que dizer o que retorna para ir à tela
    //temos que utilizar então alguma função de array para fazer retornar o dado na tela
    return (

        //chamando o StyledTimeline
        <StyledTimeline>
            {/*o forEach() não funciona, não faz nada nesse caso e retorna undefined*/}
            {/*precisamos usar o map. o map convertemos de uma coisa para outra coisa,
            então queremos converter da lista de nomes para componente React */}
            {/* VAI SER MAP O TEMPO TODO*/}
            {playlistNames.map((playlistName) => {
                const videos = propriedades.playlists[playlistName];
                //console.log(playlistName);
                //console.log(videos);

                {/*Está claro que estamos traduzindo de uma lista de objetos para uma lista de componentes React*/ }
                return (
                    <section>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.map((video) => {
                                return (
                                    <a href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
            {/*Acima devolvemos o array fazendo um mapa que mapeia para cada objeto o 
            próprio objeto*/}
            <StyledFavorites>
                Favoritos
            </StyledFavorites>
        </StyledTimeline>
    )

}