  const rail = document.getElementById('rail');
  const railFill = document.getElementById('railFill');
  const nodes = Array.from(document.querySelectorAll('.rail-node'));

  function layoutNodes(){
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    nodes.forEach(node => {
      const target = document.getElementById(node.dataset.target);
      if(!target) return;
      const top = target.offsetTop;
      const pct = Math.min(100, Math.max(0, (top / docHeight) * 100));
      node.style.top = pct + '%';
    });
  }

  function onScroll(){
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    railFill.style.height = Math.min(100, Math.max(0, progress)) + '%';

    nodes.forEach(node => {
      const top = parseFloat(node.style.top || '0');
      node.classList.toggle('active', progress >= top - 1);
    });
  }

  window.addEventListener('load', () => { layoutNodes(); onScroll(); });
  window.addEventListener('resize', () => { layoutNodes(); onScroll(); });
  window.addEventListener('scroll', onScroll, { passive:true });