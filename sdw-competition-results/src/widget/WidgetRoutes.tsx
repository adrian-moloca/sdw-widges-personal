import { Routes, Route } from 'react-router-dom';
import WidgetMain from './WidgetMain';
import { CompetitionDetail, EventDetail } from 'components';

const WidgetRoutes = () => (
  <Routes>
    <Route path="/" element={<WidgetMain />}></Route>
    <Route path="/sdw/widget/competition/:id" element={<WidgetMain />}>
      <Route index element={<CompetitionDetail />} />
      <Route path="disciplines" index element={<CompetitionDetail />} />
      <Route path="schedule" index element={<CompetitionDetail />} />
      <Route path="medals" index element={<CompetitionDetail />} />
      <Route path="participants" index element={<CompetitionDetail />} />
      <Route path="discipline/:disciplineId" element={<CompetitionDetail />} />
      <Route path="discipline/:disciplineId/event/:eventId" element={<EventDetail />} />
      <Route
        path="discipline/:disciplineId/event/:eventId/unit/:unitId"
        element={<EventDetail />}
      />
      <Route
        path="discipline/:disciplineId/event/:eventId/phase/:phaseId/unit/:unitId"
        element={<EventDetail />}
      />
      <Route
        path="discipline/:disciplineId/event/:eventId/phase/:phaseId"
        element={<EventDetail />}
      />
    </Route>
    <Route path="/sdw/widget/event/:id" element={<EventDetail />} />
  </Routes>
);

export default WidgetRoutes;
