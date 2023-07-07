import Finder from "@/components/finder";
import { GameSection } from "@/components/gameSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="data container-md my-3" style={{ color: "whitesmoke" }}>
      <h1>
        Bienvenido a <span>Rifas X1UP</span>
      </h1>
      <hr />
      <div className="row text-center text-nowrap">
        <div className="col">
          <hr />
          <h3 className="fs-5">Usuarios activos</h3>
          <p>125</p>
          <hr />
        </div>
        <div className="col">
          <hr />
          <h3 className="fs-5">Rifas activas</h3>
          <p>208</p>
          <hr />
        </div>
        <div className="col">
          <hr />
          <h3 className="fs-5">Ganadores</h3>
          <p>548</p>
          <hr />
        </div>
      </div>
      <div className="row my-5">
        <div className="col mw-25">
          <h3 className="text-center fs-2">
            ¿Por qué unirte a nuestra comunidad?
          </h3>
          <p className="text-center fs-4">
            Bienvenido/a a nuestra comunidad, el lugar perfecto para llevar tus
            rifas al siguiente nivel. Si estás buscando una forma sencilla y
            efectiva de organizar rifas y vender números en línea, has llegado
            al sitio indicado. Permítenos mostrarte todas las razones por las
            cuales unirte a nuestra plataforma te brindará una experiencia
            excepcional.
          </p>
          <ol className="list-group d-flex flex-row flex-wrap gap-5 justify-content-center my-5">
            <li
              className="list-group-item rounded-0"
              style={{
                width: "300px",
                background: "#2E3840",
                border: "0",
                color: "whitesmoke",
                padding: "30px",
              }}
            >
              <strong>Comodidad y accesibilidad</strong>: Olvídate de los
              métodos tradicionales de venta de boletos y el tedioso papeleo.
              Con nuestra página web, puedes crear y gestionar tus rifas desde
              cualquier lugar y en cualquier momento. Solo necesitas una
              conexión a Internet.
            </li>
            <li
              className="list-group-item rounded-0"
              style={{
                width: "300px",
                background: "#2E3840",
                border: "0",
                color: "whitesmoke",
                padding: "30px",
              }}
            >
              <strong>Seguridad</strong>: La confianza es fundamental en nuestra
              comunidad. Por eso, hemos implementado medidas de seguridad
              avanzadas para proteger tus datos personales y financieros. Puedes
              estar tranquilo/a al saber que tus transacciones estarán
              protegidas de principio a fin.
            </li>
            <li
              className="list-group-item rounded-0"
              style={{
                width: "300px",
                background: "#2E3840",
                border: "0",
                color: "whitesmoke",
                padding: "30px",
              }}
            >
              <strong>Amplia audiencia</strong>: Al unirte a nuestra comunidad,
              tendrás acceso a una gran base de usuarios registrados interesados
              en participar en rifas. Esto significa que tendrás más
              oportunidades de vender tus números y alcanzar tus metas de
              recaudación más rápido y eficientemente.
            </li>
            <li
              className="list-group-item rounded-0"
              style={{
                width: "300px",
                background: "#2E3840",
                border: "0",
                color: "whitesmoke",
                padding: "30px",
              }}
            >
              <strong>Herramientas de promoción</strong>: Para que tus rifas
              tengan el éxito que merecen, te ofrecemos herramientas de
              promoción integradas en nuestra plataforma. Puedes compartir tus
              rifas en redes sociales, enviar invitaciones por correo
              electrónico y mucho más. Maximiza la visibilidad de tus rifas y
              atrae a más participantes.
            </li>
            <li
              className="list-group-item rounded-0"
              style={{
                width: "300px",
                background: "#2E3840",
                border: "0",
                color: "whitesmoke",
                padding: "30px",
              }}
            >
              <strong>Experiencia personalizada</strong>: Nos esforzamos por
              ofrecer una experiencia personalizada para cada usuario. Te
              brindamos un panel de control intuitivo y fácil de usar, donde
              podrás realizar un seguimiento de tus rifas, administrar tus
              ventas y obtener estadísticas detalladas para tomar decisiones
              informadas.
            </li>
            <li
              className="list-group-item rounded-0"
              style={{
                width: "300px",
                background: "#2E3840",
                border: "0",
                color: "whitesmoke",
                padding: "30px",
              }}
            >
              <strong>Interacción y comunidad</strong>: Nuestra plataforma no es
              solo un lugar para vender boletos, sino también un espacio para
              interactuar con otros apasionados de las rifas. Puedes unirte a
              grupos temáticos, participar en conversaciones, compartir consejos
              y disfrutar de una comunidad vibrante y solidaria.
            </li>
          </ol>
          <p className="fs-4">
            No pierdas más tiempo. Únete a nuestra comunidad y descubre todo lo
            que podemos ofrecerte. Con nuestra página web, crear rifas y vender
            números se convierte en una experiencia sencilla, segura y
            emocionante. ¡Regístrate ahora y prepárate para llevar tus rifas al
            siguiente nivel!
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col d-flex justify-content-center align-items-center">
          <Finder />
        </div>
      </div>
    </div>
  );
}
