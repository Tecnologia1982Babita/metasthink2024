import GlobalVar from './GlobalVar';
import chroma from 'chroma-js';



export default class GlobalGraficoTipodePag{

  static configuracaoDados = {

    labels: [],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: [
          '#4DCF87',
          '#23CAD5',
          '#D52323',
          '#E5CF05',
        ],
        borderColor: [
          '#FFFFFF',
          '#FFFFFF',
          '#FFFFFF',
          '#FFFFFF',
        ],
        borderWidth: 2,
      },
      
    ],
    
  };
  
  static options = {
    plugins:{
        legend: {
          display: true,
          position: 'right', 
          onClick: (e) => {},
          labels: {
            usePointStyle: true, // Use um estilo de ponto (círculo) em vez de caixa
            boxWidth: 4, 
            font:{
                size: 15,
            },
            fontColor: 'black', 
          },
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem) => {
              const value = tooltipItem.formattedValue;
              const formattedValue = GlobalVar.converteFloat(GlobalVar.desconverterFloat(value).toFixed(2));
              return ` R$ ${formattedValue}`;
            },
          },
        },
    }
  };

  static myPlugin = {
    id: 'customShadow',
    beforeDraw: (chart) => {
      const ctx = chart.ctx;
      ctx.save();

      const originalLineDraw = ctx.stroke;
      ctx.stroke = function () {
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;
        originalLineDraw.apply(this, arguments);
        ctx.restore();
      };
    }
  }


  static gerarTomDiferente(index, corBase, tom) {
    corBase = chroma(corBase)
    let scaleColor = chroma.scale([corBase, tom, corBase]).mode('lch')(index* 0.8 + 0.1);
    let luminanceVariation = scaleColor.set('hsl.l', index * 0.1 + 0.6); // variação mínima de luminosidade
    return luminanceVariation.hex();
  }
}

