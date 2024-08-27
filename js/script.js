document.addEventListener('DOMContentLoaded', () => {
    const nomeMesH2 = document.getElementById('nomeMes');
    const tabelaCalendario = document.getElementById('tabelaCalendario');
    const feriadosDiv = document.getElementById('feriados');
    const prevMesSpan = document.getElementById('prevMes');
    const nextMesSpan = document.getElementById('nextMes');
    const anoSelect = document.getElementById('anoSelect');

    let hoje = new Date();
    let anoAtual = hoje.getFullYear();
    let mesAtual = hoje.getMonth();

    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const feriados = {
        1: { eventos: ['01 - Ano Novo', '06 - Dia de Reis'], descricoes: ['Celebra o início do ano.', 'Marca a visita dos Reis Magos a Jesus.'] },
        2: { eventos: ['14 - Dia dos Namorados'], descricoes: ['Celebra o amor e a amizade.'] },
        4: { eventos: ['21 - Tiradentes'], descricoes: ['Comemora o mártir da independência do Brasil.'] },
        5: { eventos: ['01 - Dia do Trabalhador'], descricoes: ['Homenageia os trabalhadores.'] },
        6: { eventos: ['13 - Santo Antônio'], descricoes: ['Celebrado como o santo casamenteiro.'] },
        7: { eventos: [], descricoes: [] },
        8: { eventos: ['15 - Assunção de Nossa Senhora'], descricoes: ['Comemora a ascensão de Maria ao céu.'] },
        9: { eventos: ['07 - Independência do Brasil'], descricoes: ['Celebra a independência do Brasil de Portugal.'] },
        10: { eventos: ['12 - Nossa Senhora Aparecida'], descricoes: ['Festa dedicada à padroeira do Brasil.'] },
        11: { eventos: ['02 - Finados'], descricoes: ['Dia para lembrar os entes queridos falecidos.'] },
        12: { eventos: ['25 - Natal', '31 - Réveillon'], descricoes: ['Celebra o nascimento de Jesus.', 'Celebra a chegada do novo ano.'] }
    };

    function criarCalendario(ano, mes) {
        const primeiroDia = new Date(ano, mes, 1).getDay();
        const ultimoDia = new Date(ano, mes + 1, 0).getDate();
        let html = `<thead>
                        <tr>
                            <th>Dom</th>
                            <th>Seg</th>
                            <th>Ter</th>
                            <th>Qua</th>
                            <th>Qui</th>
                            <th>Sex</th>
                            <th>Sab</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>`;
    
        // Armazena os dias com feriados e suas descrições para o mês atual
        const feriadosMes = feriados[mes + 1] || { eventos: [], descricoes: [] };
        const eventos = new Map(feriadosMes.eventos.map((e, i) => [parseInt(e.split(' - ')[0]), feriadosMes.descricoes[i]]));
    
        for (let i = 0; i < primeiroDia; i++) {
            html += '<td></td>';
        }
    
        for (let dia = 1; dia <= ultimoDia; dia++) {
            const descricao = eventos.get(dia) || '';
            const tooltip = descricao ? `<div class="tooltip">${descricao}</div>` : '';
            const classeFeriado = descricao ? 'feriado' : '';
            if ((primeiroDia + dia - 1) % 7 === 0 && dia !== 1) {
                html += '</tr><tr>';
            }
            html += `<td class="${classeFeriado}">${dia}${tooltip}</td>`;
        }
    
        html += '</tr></tbody>';
        tabelaCalendario.innerHTML = html;
        nomeMesH2.textContent = `${meses[mes]} ${ano}`;
        atualizarFeriados(ano, mes);
    }
    

    function atualizarFeriados(ano, mes) {
        let feriadosHtml = `<h3>Feriados em ${meses[mes]} ${ano}</h3>`;
        const feriadosMes = feriados[mes + 1] || { eventos: [], descricoes: [] };
        if (feriadosMes.eventos.length > 0) {
            feriadosHtml += '<ul>';
            feriadosMes.eventos.forEach((feriado, i) => {
                feriadosHtml += `<li>${feriado} - ${feriadosMes.descricoes[i]}</li>`;
            });
            feriadosHtml += '</ul>';
        } else {
            feriadosHtml += '<p>Não há feriados neste mês.</p>';
        }
        feriadosDiv.innerHTML = feriadosHtml;
    }

    function atualizarCalendario() {
        tabelaCalendario.style.opacity = 0;
        setTimeout(() => {
            criarCalendario(anoAtual, mesAtual);
            tabelaCalendario.style.opacity = 1;
        }, 300);
    }
    
    prevMesSpan.addEventListener('click', () => {
        if (mesAtual === 0) {
            mesAtual = 11;
            anoAtual--;
        } else {
            mesAtual--;
        }
        atualizarCalendario();
    });

    nextMesSpan.addEventListener('click', () => {
        if (mesAtual === 11) {
            mesAtual = 0;
            anoAtual++;
        } else {
            mesAtual++;
        }
        atualizarCalendario();
    });

    anoSelect.addEventListener('change', () => {
        anoAtual = parseInt(anoSelect.value);
        atualizarCalendario();
    });

    function preencherAnoSelect() {
        const anos = [];
        for (let i = anoAtual - 5; i <= anoAtual + 5; i++) {
            anos.push(i);
        }
        anoSelect.innerHTML = anos.map(ano => `<option value="${ano}" ${ano === anoAtual ? 'selected' : ''}>${ano}</option>`).join('');
    }

    preencherAnoSelect();
    atualizarCalendario();
});
